import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Question {
  id: number;
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ExamState {
  currentQuestion: number;
  answers: { [key: number]: number };
  flaggedQuestions: Set<number>;
  timeRemaining: number;
  isPaused: boolean;
  autoRead: boolean;
}

const AWSExamQuestionPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const navigate = useNavigate()
  const [examState, setExamState] = useState<ExamState>({
    currentQuestion: 1,
    answers: {},
    flaggedQuestions: new Set(),
    timeRemaining: 130 * 60,
    isPaused: false,
    autoRead: false
  })
  const [speechSynthesis, setSpeechSynthesis] = useState<any>(null)
  // Load and randomly select 65 questions from the complete question bank
  const loadQuestions = (): Question[] => {
    const largeBank = (window as any).__LARGE_BANK__
    const examTen = (window as any).__EXAM_TEN__
    const allQuestions: Question[] = []
    
    // Load from large bank
    if (largeBank?.questions) {
      largeBank.questions.forEach((q: any) => {
        const options = Array.isArray(q.options) ? q.options : Object.values(q.options || {})
        allQuestions.push({
          id: q.question_number || q.id,
          domain: 'AWS Solutions Architecture',
          question: q.question || q.question_text,
          options: options,
          correctAnswer: 0 // Will be handled in scoring
        })
      })
    }
    
    // Load from exam ten
    if (examTen?.exam?.questions) {
      examTen.exam.questions.forEach((q: any) => {
        const options = Array.isArray(q.options) ? q.options : Object.values(q.options || {})
        allQuestions.push({
          id: q.question_number || q.id,
          domain: 'AWS Solutions Architecture',
          question: q.question || q.question_text,
          options: options,
          correctAnswer: 0 // Will be handled in scoring
        })
      })
    }
    
    // If no questions loaded, create sample questions
    if (allQuestions.length === 0) {
      return Array.from({ length: 65 }, (_, i) => ({
        id: i + 1,
        domain: 'Design Resilient Architectures',
        question: `Sample question ${i + 1}: A company wants to implement secure storage of application secrets and API keys. What should the Solutions Architect recommend?`,
        options: [
          'Use AWS Secrets Manager with automatic rotation',
          'Store secrets in S3 with server-side encryption',
          'Use AWS KMS for key management only',
          'Store secrets in environment variables'
        ],
        correctAnswer: 0
      }))
    }
    
    // Randomly select 65 questions from the full bank
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 65)
  }

  const [questions] = useState<Question[]>(loadQuestions())
  const currentQ = questions[examState.currentQuestion - 1]
  useEffect(() => {
    let interval: any
    if (!examState.isPaused && examState.timeRemaining > 0) {
      interval = setInterval(() => {
        setExamState(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [examState.isPaused, examState.timeRemaining])

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis)
    }
  }, [])
  // Ensure persistent vertical scrollbar to avoid layout width shifts
  useEffect(() => {
    const htmlEl = document.documentElement
    const previousOverflowY = htmlEl.style.overflowY
    htmlEl.style.overflowY = 'scroll'
    return () => { htmlEl.style.overflowY = previousOverflowY }
  }, [])
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  const togglePause = (): void => { setExamState(prev => ({ ...prev, isPaused: !prev.isPaused })) }
  const toggleFlag = (): void => {
    setExamState(prev => {
      const newFlagged = new Set(prev.flaggedQuestions)
      if (newFlagged.has(prev.currentQuestion)) newFlagged.delete(prev.currentQuestion)
      else newFlagged.add(prev.currentQuestion)
      return { ...prev, flaggedQuestions: newFlagged }
    })
  }
  const selectAnswer = (optionIndex: number): void => {
    setExamState(prev => ({ ...prev, answers: { ...prev.answers, [prev.currentQuestion]: optionIndex } }))
  }
  const navigateToQuestion = (questionNum: number): void => { setExamState(prev => ({ ...prev, currentQuestion: questionNum })) }
  const goNext = (): void => { if (examState.currentQuestion < questions.length) setExamState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 })) }
  const goPrevious = (): void => { if (examState.currentQuestion > 1) setExamState(prev => ({ ...prev, currentQuestion: prev.currentQuestion - 1 })) }
  const submitExam = (): void => {
    const confirmed = window.confirm('Are you sure you want to submit your exam? This action cannot be undone.')
    if (confirmed) { navigate('/results') }
  }
  const toggleDarkMode = (): void => { setIsDarkMode(!isDarkMode) }

  const speakQuestion = (): void => {
    if (speechSynthesis && currentQ) {
      speechSynthesis.cancel() // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(currentQ.question)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeech = (): void => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
    }
  }
  const theme = { dark: { bg: '#1a1a1a', text: '#ffffff', cardBg: '#2d2d2d', border: '#404040', accent: '#60A5FA' }, light: { bg: '#f5f5f5', text: '#1a1a1a', cardBg: '#ffffff', border: '#e0e0e0', accent: '#60A5FA' } }
  const currentTheme = isDarkMode ? theme.dark : theme.light
  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.bg
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    return () => { document.body.style.backgroundColor = ''; document.body.style.margin = ''; document.body.style.padding = '' }
  }, [isDarkMode])
  return (
    <div style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #93C5FD, #60A5FA, #1D4ED8)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ffffff', margin: '0' }}>AWS SAA-C03</h1>
          <p style={{ fontSize: '0.9rem', color: '#ffffff', margin: '0', opacity: 0.9 }}>Practice Exam Simulator</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={toggleDarkMode} style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem' }}>{isDarkMode ? '☀️' : '🌙'}</button>
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '1.2rem', fontWeight: '600', fontFamily: 'monospace' }}>{formatTime(examState.timeRemaining)}</div>
          <button onClick={togglePause} style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#1E40AF', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }}>{examState.isPaused ? 'Resume' : 'Pause'}</button>
        </div>
      </div>
      <div style={{ padding: '1.5rem 2rem', borderBottom: `1px solid ${currentTheme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '600', color: currentTheme.text, margin: '0' }}>Question {examState.currentQuestion} of {questions.length}</h2>
            <span style={{ backgroundColor: '#60A5FA', color: '#0f172a', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>{currentQ?.domain}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={speakQuestion} style={{ backgroundColor: currentTheme.accent, color: '#000000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500' }}>Speak</button>
            <button onClick={stopSpeech} style={{ backgroundColor: currentTheme.accent, color: '#000000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500' }}>Stop</button>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: currentTheme.text }}>
              <input type="checkbox" checked={examState.autoRead} onChange={(e) => setExamState(prev => ({ ...prev, autoRead: e.target.checked }))} />
              Auto read
            </label>
            <button onClick={toggleFlag} style={{ backgroundColor: examState.flaggedQuestions.has(examState.currentQuestion) ? '#1E3A8A' : currentTheme.accent, color: '#000000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500' }}>🏴 Flag</button>
          </div>
        </div>
      </div>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', flex: '1 1 auto', display: 'flex', flexDirection: 'column', minHeight: '640px', paddingBottom: '96px' }}>
        <div style={{ marginBottom: '2rem', flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1.5rem', minHeight: '160px', display: 'flex', alignItems: 'flex-start' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: currentTheme.text, margin: 0, wordBreak: 'break-word' }}>{currentQ?.question}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentQ?.options.map((option, index) => (
              <label key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', backgroundColor: currentTheme.cardBg, border: `2px solid ${examState.answers[examState.currentQuestion] === index ? currentTheme.accent : currentTheme.border}`, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onMouseEnter={(e) => { if (examState.answers[examState.currentQuestion] !== index) { e.currentTarget.style.borderColor = `${currentTheme.accent}80` } }}
                onMouseLeave={(e) => { if (examState.answers[examState.currentQuestion] !== index) { e.currentTarget.style.borderColor = currentTheme.border } }}
              >
                <input type="radio" name={`question-${examState.currentQuestion}`} value={index} checked={examState.answers[examState.currentQuestion] === index} onChange={() => selectAnswer(index)} style={{ marginTop: '0.25rem', accentColor: currentTheme.accent }} />
                <span style={{ fontSize: '1rem', lineHeight: '1.5', color: currentTheme.text, wordBreak: 'break-word' }}>{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0, padding: '0.75rem 0', borderTop: `1px solid ${currentTheme.border}`, minHeight: '64px', flex: '0 0 auto', position: 'sticky', bottom: 0, backgroundColor: currentTheme.bg, zIndex: 5 }}>
          <button onClick={goPrevious} disabled={examState.currentQuestion === 1} style={{ backgroundColor: examState.currentQuestion === 1 ? currentTheme.border : currentTheme.cardBg, color: examState.currentQuestion === 1 ? '#999' : currentTheme.text, border: `2px solid ${currentTheme.border}`, padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: examState.currentQuestion === 1 ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: '500' }}>Previous</button>
          <button onClick={goNext} disabled={examState.currentQuestion === questions.length} style={{ backgroundColor: currentTheme.accent, color: '#000000', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: examState.currentQuestion === questions.length ? 'not-allowed' : 'pointer', fontSize: '1rem', fontWeight: '600', opacity: examState.currentQuestion === questions.length ? 0.5 : 1 }}>Next</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: '0.5rem', marginBottom: '2rem' }}>
          {Array.from({ length: questions.length }, (_, i) => i + 1).map(num => {
            const isAnswered = examState.answers[num] !== undefined
            const isCurrent = num === examState.currentQuestion
            const isFlagged = examState.flaggedQuestions.has(num)
            let backgroundColor = currentTheme.cardBg
            let color = currentTheme.text
            let borderColor = currentTheme.border
            if (isCurrent) { backgroundColor = currentTheme.accent; color = '#000000'; borderColor = currentTheme.accent }
            else if (isAnswered) { backgroundColor = '#4caf50'; color = '#ffffff'; borderColor = '#4caf50' }
            else if (isFlagged) { backgroundColor = '#ff6b00'; color = '#ffffff'; borderColor = '#ff6b00' }
            return (
              <button key={num} onClick={() => navigateToQuestion(num)} style={{ backgroundColor, color, border: `2px solid ${borderColor}`, padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', minWidth: '40px', height: '40px', transition: 'all 0.3s ease' }}>{num}</button>
            )
          })}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={submitExam} style={{ backgroundColor: '#e53e3e', color: '#ffffff', border: 'none', padding: '1rem 3rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: '600', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c53030' }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e53e3e' }}>Submit Exam</button>
        </div>
      </div>
    </div>
  )
}

export default AWSExamQuestionPage

