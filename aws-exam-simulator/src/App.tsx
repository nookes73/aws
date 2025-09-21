import { useEffect, useMemo, useState } from 'react'
import AWSExamLandingPage from './AWSExamLandingPage'
import './App.css'

type Question = {
  id: string
  text: string
  choices: string[]
  correctIndices: number[]
  explanation?: string
}

type LoadedData = {
  questions: Question[]
}

const QUESTION_SET_SIZE = 65
const EXAM_DURATION_SECONDS = 130 * 60
const STORAGE_KEY = 'quizSession.v1'
const TIMER_KEY = 'quizTimer.v1'
const FLAGS_KEY = 'quizFlags.v1'
const THEME_KEY = 'quizTheme.v1'

type SessionState = {
  ids: string[]
  index: number
}

function shuffleInPlace<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

function loadSession(): SessionState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SessionState
  } catch {
    return null
  }
}

function saveSession(state: SessionState) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function startNewSession(allQuestions: Question[]): SessionState {
  if (allQuestions.length < QUESTION_SET_SIZE) {
    console.warn(`There are only ${allQuestions.length} questions; the session will include all of them.`)
  }
  const setSize = Math.min(QUESTION_SET_SIZE, allQuestions.length)
  const ids = shuffleInPlace([...allQuestions]).slice(0, setSize).map(q => q.id)
  const session: SessionState = { ids, index: 0 }
  saveSession(session)
  return session
}

function isCorrect(selected: number[], correct: number[]): boolean {
  if (selected.length !== correct.length) return false
  const a = [...selected].sort((x, y) => x - y)
  const b = [...correct].sort((x, y) => x - y)
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

function parseAdvancedTxt(input: string): Question[] {
  const lines = input.split(/\r?\n/)
  const questions: Question[] = []
  let qTextLines: string[] = []
  let choices: string[] = []
  let qIndex = 0
  let inAnswerKey = false
  const answerMap = new Map<number, string>()

  const pushQuestionIfAny = () => {
    if (qTextLines.length === 0 || choices.length === 0) return
    const id = `adv-${qIndex}`
    const text = qTextLines.join(' ').trim()
    const normChoices = choices.map(c => c.replace(/^\s*[A-D]\)\s*/, '').trim())
    const letter = answerMap.get(qIndex)
    let correctIndices: number[] = []
    if (letter) {
      const letters = letter.split(/[,/\\|\s]+/).map(s => s.trim()).filter(Boolean)
      const set = new Set<number>()
      for (const L of letters) {
        const idx = L.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0)
        if (idx >= 0 && idx < normChoices.length) set.add(idx)
      }
      correctIndices = Array.from(set)
    }
    if (text && normChoices.length > 0 && correctIndices.length > 0) {
      questions.push({ id, text, choices: normChoices, correctIndices })
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (/^Answer Key/i.test(line)) {
      // start answer key section
      inAnswerKey = true
      // finalize last question before answer key
      pushQuestionIfAny()
      qTextLines = []
      choices = []
      continue
    }
    if (inAnswerKey) {
      // Format examples: "1. A) ..." or "1. A) ..."; capture the letter after the number.
      const m = line.match(/^(\d+)\s*\.\s*([A-Da-d])/)
      if (m) {
        const num = parseInt(m[1], 10)
        const letter = m[2].toUpperCase()
        answerMap.set(num, letter)
      }
      continue
    }

    const qStart = line.match(/^Question\s+(\d+)/i)
    if (qStart) {
      // push previous
      pushQuestionIfAny()
      qIndex = parseInt(qStart[1], 10)
      qTextLines = []
      choices = []
      continue
    }
    const choiceMatch = line.match(/^[A-Da-d]\)/)
    if (choiceMatch) {
      choices.push(line)
      continue
    }
    if (line.length > 0) {
      qTextLines.push(line)
    }
  }
  // finalize
  pushQuestionIfAny()

  return questions
}

function App() {
  const [data, setData] = useState<LoadedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<SessionState | null>(null)
  const [selectedById, setSelectedById] = useState<Record<string, number[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(EXAM_DURATION_SECONDS)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [flaggedById, setFlaggedById] = useState<Record<string, boolean>>({})
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [autoRead, setAutoRead] = useState<boolean>(false)
  // const [totalPoolCount, setTotalPoolCount] = useState<number | null>(null)
  const [datasetSource] = useState<'json' | 'advancedTxt' | 'merged'>('merged')
  // const [starting, setStarting] = useState(false)

  // Whether to show the landing page component
  const showLanding = !session || session.ids.length === 0

  // Shared start logic (merged dataset by default)
  const startExamFlow = async () => {
    try {
      let questions: Question[] = []
      if (datasetSource === 'json') {
        questions = data!.questions
      } else if (datasetSource === 'advancedTxt') {
        const res = await fetch('/advanced-65.txt', { cache: 'no-store' })
        if (!res.ok) throw new Error(`Failed to load advanced-65.txt: ${res.status}`)
        const txt = await res.text()
        questions = parseAdvancedTxt(txt)
      } else {
        // merged
        const res = await fetch('/advanced-65.txt', { cache: 'no-store' })
        if (!res.ok) throw new Error(`Failed to load advanced-65.txt: ${res.status}`)
        const txt = await res.text()
        const adv = parseAdvancedTxt(txt)
        const seen = new Set<string>()
        const makeKey = (q: Question) => {
          const text = q.text.trim().toLowerCase()
          const choices = q.choices.map(c => c.trim().toLowerCase()).join('\u0001')
          return `${text}\u0000${choices}`
        }
        const merged: Question[] = []
        for (const q of data!.questions) {
          const key = makeKey(q)
          if (!seen.has(key)) {
            seen.add(key)
            merged.push(q)
          }
        }
        for (const q of adv) {
          const key = makeKey(q)
          if (!seen.has(key)) {
            seen.add(key)
            merged.push(q)
          }
        }
        questions = merged
      }
      const s = startNewSession(questions)
      setData({ questions })
      setSession(s)
      setSelectedById({})
      setShowResults(false)
      setRemainingSeconds(EXAM_DURATION_SECONDS)
      setIsPaused(false)
      setFlaggedById({})
      try {
        sessionStorage.setItem(TIMER_KEY, JSON.stringify({ remainingSeconds: EXAM_DURATION_SECONDS, isPaused: false }))
        sessionStorage.setItem(FLAGS_KEY, JSON.stringify({}))
      } catch {}
    } catch (e: any) {
      setError(e?.message ?? 'Failed to start session')
    } finally {
    }
  }

  // Intercept alert from landing page to trigger start flow without modifying component
  useEffect(() => {
    if (!showLanding) return
    const originalAlert = window.alert
    window.alert = (message?: any) => {
      const text = typeof message === 'string' ? message : String(message)
      if (text && text.includes('Starting AWS SAA-C03 Practice Exam')) {
        // Trigger the actual start logic
        void startExamFlow()
        return
      }
      originalAlert(message)
    }
    return () => {
      window.alert = originalAlert
    }
  }, [showLanding, datasetSource, data])

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/questions.json', { cache: 'no-store' })
        if (!res.ok) throw new Error(`Failed to load questions.json: ${res.status}`)
        const json = await res.json()
        const letterToIndex = (letter: string): number | null => {
          const L = letter.trim().toUpperCase()
          if (L.length === 0) return null
          const code = L.charCodeAt(0) - 'A'.charCodeAt(0)
          return code >= 0 && code < 26 ? code : null
        }
        const parseCorrectAnswer = (val: any, numChoices: number): number[] => {
          if (Array.isArray(val)) {
            // If provided as array of indices
            const nums = val.map((v: any) => Number(v)).filter((n: number) => Number.isInteger(n) && n >= 0 && n < numChoices)
            return Array.from(new Set(nums))
          }
          if (typeof val === 'number') {
            return val >= 0 && val < numChoices ? [val] : []
          }
          if (typeof val === 'string') {
            // Support formats like "A", "B", or "A, C", "A,C"
            const parts = val.split(/[,/\\|\s]+/).map((p: string) => p.trim()).filter(Boolean)
            const indices = parts
              .map(p => letterToIndex(p))
              .filter((n): n is number => n !== null && n >= 0 && n < numChoices)
            return Array.from(new Set(indices))
          }
          return []
        }

        const normalizeChoice = (choice: any): string => {
          const s = String(choice ?? '')
          // Strip leading "A. ", "B. ", etc., if present
          const match = s.match(/^\s*[A-Za-z]\s*\.\s*(.*)$/)
          return match ? match[1] : s
        }

        const questions = (json.questions ?? [])
          .map((q: any, idx: number) => {
            const id = String(q.id ?? q.question_number ?? idx)
            const text = String(q.text ?? q.question ?? '')
            const rawChoices: any[] = Array.isArray(q.choices ?? q.options) ? (q.choices ?? q.options) : []
            const choices: string[] = rawChoices.map(normalizeChoice)
            let correct: number[] = []
            if (Array.isArray(q.correctIndices)) correct = q.correctIndices
            else if (typeof q.correctIndex === 'number') correct = [q.correctIndex]
            else if (typeof q.answerIndex === 'number') correct = [q.answerIndex]
            else if (Array.isArray(q.answers)) correct = q.answers
            else if (typeof q.correct_answer !== 'undefined') correct = parseCorrectAnswer(q.correct_answer, choices.length)
            else if (typeof q.correctAnswer !== 'undefined') correct = parseCorrectAnswer(q.correctAnswer, choices.length)
            return { id, text, choices, correctIndices: correct, explanation: q.explanation } as Question
          })
          .filter((q: Question) => q.text && q.choices.length > 0 && q.correctIndices.length > 0)
        if (!cancelled) setData({ questions })
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load questions')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!data) return
    const existing = loadSession()
    if (existing && existing.ids.length > 0) {
      setSession(existing)
      // Restore timer and flags
      try {
        const t = sessionStorage.getItem(TIMER_KEY)
        if (t) {
          const tv = JSON.parse(t) as { remainingSeconds: number, isPaused: boolean }
          if (typeof tv.remainingSeconds === 'number') setRemainingSeconds(Math.max(0, tv.remainingSeconds))
          if (typeof tv.isPaused === 'boolean') setIsPaused(tv.isPaused)
        }
        const f = sessionStorage.getItem(FLAGS_KEY)
        if (f) {
          const fv = JSON.parse(f) as Record<string, boolean>
          setFlaggedById(fv || {})
        }
      } catch {}
    }
  }, [data])

  // Removed total pool size computation; landing page handles display

  // Theme init
  useEffect(() => {
    try {
      const t = localStorage.getItem(THEME_KEY)
      if (t) setDarkMode(t === 'dark')
      else setDarkMode(true)
    } catch { setDarkMode(true) }
  }, [])

  // Apply theme class
  useEffect(() => {
    const el = document.documentElement
    if (darkMode) {
      el.classList.add('dark')
      try { document.body.classList.add('dark') } catch {}
      try { localStorage.setItem(THEME_KEY, 'dark') } catch {}
    } else {
      el.classList.remove('dark')
      try { document.body.classList.remove('dark') } catch {}
      try { localStorage.setItem(THEME_KEY, 'light') } catch {}
    }
  }, [darkMode])

  // Timer ticking
  useEffect(() => {
    if (showResults) return
    if (!session || session.ids.length === 0) return
    if (isPaused) return
    if (remainingSeconds <= 0) return
    const id = window.setInterval(() => {
      setRemainingSeconds(prev => {
        const next = Math.max(0, prev - 1)
        try { sessionStorage.setItem(TIMER_KEY, JSON.stringify({ remainingSeconds: next, isPaused })) } catch {}
        return next
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [session, isPaused, showResults, remainingSeconds])

  // Auto-finish when time runs out
  useEffect(() => {
    if (!showResults && remainingSeconds === 0 && session) {
      setShowResults(true)
    }
  }, [remainingSeconds, showResults, session])

  const questionsById = useMemo(() => {
    const map = new Map<string, Question>()
    if (data?.questions) {
      for (const q of data.questions) map.set(q.id, q)
    }
    return map
  }, [data])

  if (loading) {
    return (
      <div className="container">
        <h1>AWS Exam Simulator</h1>
        <p>Loading questions…</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="container">
        <h1>AWS Exam Simulator</h1>
        <p className="error">{error}</p>
      </div>
    )
  }
  if (!data || data.questions.length === 0) {
    return (
      <div className="container">
        <h1>AWS Exam Simulator</h1>
        <p>No questions found. Add questions to public/questions.json.</p>
      </div>
    )
  }

  if (showLanding) {
    return <AWSExamLandingPage />
  }

  const currentId = session.index < session.ids.length ? session.ids[session.index] : null
  const currentQuestion = currentId ? questionsById.get(currentId) ?? null : null
  // const remaining = session.ids.length - session.index
  // const answeredCount = Object.keys(selectedById).length

  if (showResults || !currentQuestion) {
    const results = session.ids.map((id, idx) => {
      const q = questionsById.get(id)!
      const selected = selectedById[id] ?? []
      const correct = isCorrect(selected, q.correctIndices)
      return { id, index: idx + 1, q, selected, correct }
    })
    const total = session.ids.length
    const correctAnswers = results.filter(r => r.correct).length
    const finalScorePct = Math.round((correctAnswers / total) * 100)
    const timeTakenMin = Math.floor((EXAM_DURATION_SECONDS - remainingSeconds) / 60)
    const questionsFlagged = session.ids.reduce((acc, id) => acc + (flaggedById[id] ? 1 : 0), 0)
    const passed = finalScorePct >= 72

    type ColorTheme = {
      bg: string; text: string; textSecondary: string; cardBg: string; border: string; accent: string;
      success: string; error: string; warning: string;
    }
    const theme: { dark: ColorTheme; light: ColorTheme } = {
      dark: {
        bg: '#1a1a1a',
        text: '#ffffff',
        textSecondary: '#cccccc',
        cardBg: '#2d2d2d',
        border: '#404040',
        accent: '#ff9800',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
      },
      light: {
        bg: '#f5f5f5',
        text: '#1a1a1a',
        textSecondary: '#666666',
        cardBg: '#ffffff',
        border: '#e0e0e0',
        accent: '#ff9800',
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
      }
    }
    const currentTheme = darkMode ? theme.dark : theme.light

    const getScoreColor = (score: number): string => {
      if (score >= 72) return currentTheme.success
      if (score >= 50) return currentTheme.warning
      return currentTheme.error
    }
    const scoreMessage = passed
      ? { title: 'Congratulations! You Passed', subtitle: 'Great job! You have successfully passed the AWS SAA-C03 exam.', color: currentTheme.success }
      : { title: 'Unfortunately, You Did Not Pass', subtitle: 'You need 72% to pass. Keep studying and try again!', color: currentTheme.error }

    return (
      <div style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {/* Dark Mode Toggle */}
        <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
          <button
            onClick={() => setDarkMode(d => !d)}
            style={{
              backgroundColor: currentTheme.accent,
              color: '#000000',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.8rem',
              transition: 'all 0.3s ease'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: currentTheme.text, margin: '0 0 2rem 0' }}>Exam Results</h1>

            {/* Score Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: scoreMessage.color, marginBottom: '1rem' }}>{scoreMessage.title}</h2>
              <p style={{ fontSize: '1rem', color: currentTheme.textSecondary, marginBottom: '2rem', maxWidth: '400px' }}>{scoreMessage.subtitle}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <div style={{
                  width: '150px', height: '150px', borderRadius: '50%', backgroundColor: getScoreColor(finalScorePct),
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 'bold'
                }}>
                  <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>{finalScorePct}%</div>
                  <div style={{ fontSize: '1rem' }}>{correctAnswers}/{total}</div>
                </div>

                <div style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: 8, padding: '1.5rem', minWidth: 300 }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600 }}>Final Score:</span>{' '}
                    <span style={{ color: currentTheme.textSecondary }}>
                      {finalScorePct} / 100 ({correctAnswers}/{total})
                    </span>
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600 }}>Time Taken:</span>{' '}
                    <span style={{ color: currentTheme.textSecondary }}>{timeTakenMin} minutes</span>
                  </div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600 }}>Questions Answered:</span>{' '}
                    <span style={{ color: currentTheme.textSecondary }}>{correctAnswers}/{total}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 600 }}>Questions Flagged:</span>{' '}
                    <span style={{ color: currentTheme.textSecondary }}>{questionsFlagged}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Question Review Section */}
          <section>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, textAlign: 'center', marginBottom: '2rem', color: currentTheme.text }}>
              Question Review with Explanations
            </h2>

            {results.map(({ id, index, q, selected, correct }) => (
              <div key={id} style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: 8, padding: '1.5rem', marginBottom: '2rem' }}>
                {/* Question Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: currentTheme.text, margin: 0 }}>Question {index}</h3>
                  <span style={{ backgroundColor: correct ? currentTheme.success : currentTheme.error, color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: 12, fontSize: '0.8rem', fontWeight: 500 }}>
                    {correct ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>

                {/* Question Text */}
                <p style={{ fontSize: '1rem', color: currentTheme.text, marginBottom: '1.5rem', lineHeight: 1.5 }}>{q.text}</p>

                {/* Answer Options */}
                <div style={{ marginBottom: '1.5rem' }}>
                  {q.choices.map((option, optionIndex) => {
                    const isRight = q.correctIndices.includes(optionIndex)
                    const isUser = selected.includes(optionIndex)
                    let backgroundColor = currentTheme.cardBg
                    let borderColor = currentTheme.border
                    if (isRight) { backgroundColor = `${currentTheme.success}20`; borderColor = currentTheme.success }
                    else if (isUser && !isRight) { backgroundColor = `${currentTheme.error}20`; borderColor = currentTheme.error }
                    return (
                      <div key={optionIndex} style={{ backgroundColor, border: `2px solid ${borderColor}`, borderRadius: 6, padding: '1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: currentTheme.text }}>{option}</span>
                        {isRight && <span style={{ color: currentTheme.success, fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>}
                        {isUser && !isRight && <span style={{ color: currentTheme.error, fontWeight: 'bold', fontSize: '1.2rem' }}>✗ Incorrect</span>}
                      </div>
                    )
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div style={{ backgroundColor: `${currentTheme.accent}15`, border: `1px solid ${currentTheme.accent}50`, borderRadius: 6, padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: currentTheme.accent, marginBottom: '0.5rem' }}>Explanation:</div>
                    <p style={{ color: currentTheme.text, margin: 0, lineHeight: 1.5 }}>{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
            <button
              onClick={() => {
                const s = startNewSession(data.questions)
                setSession(s)
                setSelectedById({})
                setShowResults(false)
                setRemainingSeconds(EXAM_DURATION_SECONDS)
                setIsPaused(false)
              }}
              style={{ backgroundColor: currentTheme.accent, color: '#000000', border: 'none', padding: '1rem 2rem', fontSize: '1rem', fontWeight: 600, borderRadius: 6, cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              Try Again
            </button>
            <button
              onClick={() => {
                // Back to landing
                sessionStorage.removeItem(STORAGE_KEY)
                setSession({ ids: [], index: 0 })
                setShowResults(false)
              }}
              style={{ backgroundColor: 'transparent', color: currentTheme.text, border: `2px solid ${currentTheme.border}`, padding: '1rem 2rem', fontSize: '1rem', fontWeight: 600, borderRadius: 6, cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  const selected = selectedById[currentQuestion.id] ?? []
  const toggleChoice = (idx: number) => {
    setSelectedById(prev => {
      const existing = prev[currentQuestion.id] ?? []
      let next: number[]
      const isMulti = (currentQuestion.correctIndices?.length ?? 0) > 1
      if (isMulti) {
        next = existing.includes(idx) ? existing.filter(i => i !== idx) : [...existing, idx]
      } else {
        next = existing.includes(idx) ? [] : [idx]
      }
      return { ...prev, [currentQuestion.id]: next }
    })
  }

  const goNext = () => {
    const nextIndex = session.index + 1
    const updated: SessionState = { ...session, index: nextIndex }
    saveSession(updated)
    setSession(updated)
    if (nextIndex >= session.ids.length) {
      setShowResults(true)
    }
  }

  const goPrev = () => {
    const prevIndex = Math.max(0, session.index - 1)
    const updated: SessionState = { ...session, index: prevIndex }
    saveSession(updated)
    setSession(updated)
  }

  // const isAnswered = selected.length > 0
  const isMulti = (currentQuestion.correctIndices?.length ?? 0) > 1

  const timerClass = `timer${remainingSeconds <= 300 ? ' warning' : ''}`

  // Voice-over helpers using Web Speech API
  const stopSpeech = () => {
    try { window.speechSynthesis.cancel() } catch {}
  }
  const speakCurrent = () => {
    try {
      if (!currentQuestion) return
      const labelFor = (i: number) => String.fromCharCode('A'.charCodeAt(0) + i)
      const lines: string[] = []
      lines.push(`Question ${session.index + 1}. ${currentQuestion.text}`)
      currentQuestion.choices.forEach((c, idx) => lines.push(`${labelFor(idx)}. ${c}`))
      const utter = new SpeechSynthesisUtterance(lines.join('. '))
      utter.rate = 1
      utter.pitch = 1
      utter.lang = 'en-US'
      stopSpeech()
      window.speechSynthesis.speak(utter)
    } catch {}
  }

  useEffect(() => {
    if (!currentQuestion) return
    if (!autoRead) return
    if (isPaused) return
    speakCurrent()
    // stop on cleanup when question changes
    return () => { stopSpeech() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, autoRead, isPaused])

  return (
    <div className="container">
      <header className="header">
        <div className="header-left">
          <h1>AWS Solutions Architect Associate (SAA-C03) Practice Exam</h1>
          <p>65 Questions • 130 minutes</p>
        </div>
        <div className="timer-controls">
          <div className={timerClass}>{formatTime(remainingSeconds)}</div>
          <button
            className={`pause-btn${isPaused ? ' paused' : ''}`}
            onClick={() => {
              setIsPaused(p => {
                const np = !p
                try { sessionStorage.setItem(TIMER_KEY, JSON.stringify({ remainingSeconds, isPaused: np })) } catch {}
                return np
              })
            }}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button className="theme-btn" onClick={() => setDarkMode(d => !d)}>{darkMode ? 'Light' : 'Dark'}</button>
          <button className="theme-btn" onClick={speakCurrent}>Speak</button>
          <button className="theme-btn" onClick={stopSpeech}>Stop</button>
          <label className="chip" style={{ cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={autoRead}
              onChange={(e) => setAutoRead(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Auto read
          </label>
        </div>
      </header>

      <div className="question-content">
        <div className="question-header">
          <div className="question-info">
            <h3>Question {session.index + 1} / {session.ids.length}</h3>
          </div>
          <button
            onClick={() => {
              if (!currentQuestion) return
              setFlaggedById(prev => {
                const next = { ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }
                try { sessionStorage.setItem(FLAGS_KEY, JSON.stringify(next)) } catch {}
                return next
              })
            }}
            className={`flag-btn${currentQuestion && flaggedById[currentQuestion.id] ? ' flagged' : ''}`}
            title="Flag for review"
          >
            {currentQuestion && flaggedById[currentQuestion.id] ? 'Flagged' : 'Flag'}
          </button>
        </div>
        <div className="question-text">{currentQuestion.text}</div>
        <div className="options">
          {currentQuestion.choices.map((choice, idx) => (
            <label key={idx} className={`option${selected.includes(idx) ? ' selected' : ''}`}>
              <input
                type={isMulti ? 'checkbox' : 'radio'}
                name={`q-${currentQuestion.id}`}
                checked={selected.includes(idx)}
                onChange={() => toggleChoice(idx)}
              />
              <div className="option-text">{choice}</div>
            </label>
          ))}
        </div>
      </div>

      <div className="question-navigation">
        <button className="nav-btn" onClick={goPrev} disabled={session.index === 0}>Previous</button>
        <div className="spacer" />
        {session.index < session.ids.length - 1 && (
          <button className="nav-btn" onClick={goNext}>Next</button>
        )}
        {session.index === session.ids.length - 1 && (
          <button
            className="nav-btn"
            onClick={() => {
              // Enforce flagged must be answered before finish
              const unansweredFlagged = session.ids.some(id => flaggedById[id] && (!selectedById[id] || selectedById[id].length === 0))
              if (unansweredFlagged) {
                alert('Please answer all flagged questions before submitting.')
                return
              }
              setShowResults(true)
            }}
          >
            Finish
          </button>
        )}
      </div>

      {/* Numbered navigation grid */}
      <div className="question-grid">
        {session.ids.map((id, idx) => {
          const number = idx + 1
          const answered = (selectedById[id]?.length ?? 0) > 0
          const flagged = !!flaggedById[id]
          const current = session.index === idx
          const className = `question-num${current ? ' current' : ''}${answered ? ' answered' : ''}${flagged ? ' flagged' : ''}`
          return (
            <button key={id} className={className} onClick={() => {
              const updated: SessionState = { ...session, index: idx }
              saveSession(updated)
              setSession(updated)
            }}>
              {number}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default App

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')
  return `${mm}:${ss}`
}
