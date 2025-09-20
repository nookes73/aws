import { useEffect, useMemo, useState } from 'react'
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
const STORAGE_KEY = 'quizSession.v1'

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

function App() {
  const [data, setData] = useState<LoadedData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [session, setSession] = useState<SessionState | null>(null)
  const [selectedById, setSelectedById] = useState<Record<string, number[]>>({})
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/questions.json', { cache: 'no-store' })
        if (!res.ok) throw new Error(`Failed to load questions.json: ${res.status}`)
        const json = await res.json()
        const questions = (json.questions ?? []).map((q: any, idx: number) => {
          const id = String(q.id ?? idx)
          const text = String(q.text ?? q.question ?? '')
          const choices: string[] = Array.isArray(q.choices ?? q.options) ? (q.choices ?? q.options) : []
          let correct: number[] = []
          if (Array.isArray(q.correctIndices)) correct = q.correctIndices
          else if (typeof q.correctIndex === 'number') correct = [q.correctIndex]
          else if (typeof q.answerIndex === 'number') correct = [q.answerIndex]
          else if (Array.isArray(q.answers)) correct = q.answers
          return { id, text, choices, correctIndices: correct, explanation: q.explanation } as Question
        })
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
    }
  }, [data])

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

  if (!session || session.ids.length === 0) {
    return (
      <div className="container">
        <h1>AWS Exam Simulator</h1>
        <p>Total questions available: {data.questions.length}</p>
        <button
          className="primary"
          onClick={() => {
            const s = startNewSession(data.questions)
            setSession(s)
            setSelectedById({})
            setShowResults(false)
          }}
        >
          Start {Math.min(QUESTION_SET_SIZE, data.questions.length)}-question session
        </button>
      </div>
    )
  }

  const currentId = session.index < session.ids.length ? session.ids[session.index] : null
  const currentQuestion = currentId ? questionsById.get(currentId) ?? null : null
  const remaining = session.ids.length - session.index
  const answeredCount = Object.keys(selectedById).length

  if (showResults || !currentQuestion) {
    const results = session.ids.map(id => {
      const q = questionsById.get(id)!
      const selected = selectedById[id] ?? []
      const correct = isCorrect(selected, q.correctIndices)
      return { id, correct }
    })
    const score = results.filter(r => r.correct).length
    return (
      <div className="container">
        <h1>Results</h1>
        <p>
          Score: {score} / {session.ids.length}
        </p>
        <button
          onClick={() => {
            const s = startNewSession(data.questions)
            setSession(s)
            setSelectedById({})
            setShowResults(false)
          }}
          className="primary"
        >
          Start New Session
        </button>
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

  const isAnswered = selected.length > 0
  const isMulti = (currentQuestion.correctIndices?.length ?? 0) > 1

  return (
    <div className="container">
      <header className="header">
        <div>
          <strong>Question {session.index + 1}</strong> / {session.ids.length}
        </div>
        <div>
          Remaining: {remaining}
        </div>
      </header>

      <div className="question">
        <h2>{currentQuestion.text}</h2>
        <div className="choices">
          {currentQuestion.choices.map((choice, idx) => (
            <label key={idx} className={selected.includes(idx) ? 'choice selected' : 'choice'}>
              <input
                type={isMulti ? 'checkbox' : 'radio'}
                name={`q-${currentQuestion.id}`}
                checked={selected.includes(idx)}
                onChange={() => toggleChoice(idx)}
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </div>

      <footer className="footer">
        <button onClick={goPrev} disabled={session.index === 0}>Previous</button>
        <div className="spacer" />
        {session.index < session.ids.length - 1 && (
          <button onClick={goNext} disabled={!isAnswered} className="primary">Next</button>
        )}
        {session.index === session.ids.length - 1 && (
          <button onClick={() => setShowResults(true)} disabled={answeredCount < session.ids.length} className="primary">Finish</button>
        )}
      </footer>
    </div>
  )
}

export default App
