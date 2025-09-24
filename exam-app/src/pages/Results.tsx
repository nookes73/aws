import React, { useEffect, useState } from 'react'

interface ExamResult {
  finalScore: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  questionsFlagged: number;
  passed: boolean;
}

interface QuestionResult {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer: number | null;
  explanation: string;
  isCorrect: boolean;
}

interface Theme {
  bg: string;
  text: string;
  textSecondary: string;
  cardBg: string;
  border: string;
  accent: string;
  success: string;
  error: string;
  warning: string;
}

const AWSExamResultsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#1a1a1a'
      document.body.style.margin = '0'
      document.body.style.padding = '0'
    } else {
      document.body.style.backgroundColor = '#f5f5f5'
      document.body.style.margin = '0'
      document.body.style.padding = '0'
    }
    return () => {
      document.body.style.backgroundColor = ''
      document.body.style.margin = ''
      document.body.style.padding = ''
    }
  }, [isDarkMode])
  const toggleDarkMode = (): void => { setIsDarkMode(!isDarkMode) }
  const theme: { dark: Theme; light: Theme } = {
    dark: { bg: '#1a1a1a', text: '#ffffff', textSecondary: '#cccccc', cardBg: '#2d2d2d', border: '#404040', accent: '#ff9800', success: '#4caf50', error: '#f44336', warning: '#ff9800' },
    light: { bg: '#f5f5f5', text: '#1a1a1a', textSecondary: '#666666', cardBg: '#ffffff', border: '#e0e0e0', accent: '#ff9800', success: '#4caf50', error: '#f44336', warning: '#ff9800' }
  }
  const currentTheme: Theme = isDarkMode ? theme.dark : theme.light
  const examResult: ExamResult = { finalScore: 0, totalQuestions: 65, correctAnswers: 0, timeTaken: 0, questionsFlagged: 0, passed: false }
  // Sample question results - in real app, this would come from exam state
  const questionResults: QuestionResult[] = Array.from({ length: 65 }, (_, i) => ({
    id: i + 1,
    question: `Sample question ${i + 1}: A company wants to implement secure storage of application secrets and API keys. What should the Solutions Architect recommend?`,
    options: [
      'Use AWS Secrets Manager with automatic rotation',
      'Store secrets in S3 with server-side encryption', 
      'Use AWS KMS for key management only',
      'Store secrets in environment variables'
    ],
    correctAnswer: 0,
    userAnswer: Math.random() > 0.5 ? Math.floor(Math.random() * 4) : null,
    explanation: 'AWS Secrets Manager provides secure storage of secrets with automatic rotation capabilities, ensuring secrets are regularly updated and securely managed.',
    isCorrect: Math.random() > 0.3
  }))
  const getScoreColor = (score: number): string => { if (score >= 72) return currentTheme.success; if (score >= 50) return currentTheme.warning; return currentTheme.error }
  const getScoreMessage = (passed: boolean): { title: string; subtitle: string; color: string } => passed ? { title: 'Congratulations! You Passed', subtitle: 'Great job! You have successfully passed the AWS SAA-C03 exam.', color: currentTheme.success } : { title: 'Unfortunately, You Did Not Pass', subtitle: 'You need 72% to pass. Keep studying and try again!', color: currentTheme.error }
  const scoreMessage = getScoreMessage(examResult.passed)
  return (
    <div style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, minHeight: '100vh', padding: '0', margin: '0', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
        <button onClick={toggleDarkMode} style={{ backgroundColor: currentTheme.accent, color: '#000000', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontWeight: '500', fontSize: '0.8rem', transition: 'all 0.3s ease' }}>{isDarkMode ? '☀️' : '🌙'}</button>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: currentTheme.text, margin: '0 0 2rem 0' }}>Exam Results</h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: scoreMessage.color, marginBottom: '1rem' }}>{scoreMessage.title}</h2>
            <p style={{ fontSize: '1rem', color: currentTheme.textSecondary, marginBottom: '2rem', maxWidth: '400px' }}>{scoreMessage.subtitle}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: getScoreColor(examResult.finalScore), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 'bold' }}>
                <div style={{ fontSize: '2.5rem', lineHeight: '1' }}>{examResult.finalScore}%</div>
                <div style={{ fontSize: '1rem' }}>{examResult.correctAnswers}/{examResult.totalQuestions}</div>
              </div>
              <div style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '8px', padding: '1.5rem', minWidth: '300px' }}>
                <div style={{ marginBottom: '0.75rem' }}><span style={{ fontWeight: '600' }}>Final Score:</span> <span style={{ color: currentTheme.textSecondary }}>{examResult.finalScore} / 65 ({examResult.finalScore}%)</span></div>
                <div style={{ marginBottom: '0.75rem' }}><span style={{ fontWeight: '600' }}>Time Taken:</span> <span style={{ color: currentTheme.textSecondary }}>{examResult.timeTaken} minutes</span></div>
                <div style={{ marginBottom: '0.75rem' }}><span style={{ fontWeight: '600' }}>Questions Answered:</span> <span style={{ color: currentTheme.textSecondary }}>{examResult.correctAnswers}/{examResult.totalQuestions}</span></div>
                <div><span style={{ fontWeight: '600' }}>Questions Flagged:</span> <span style={{ color: currentTheme.textSecondary }}>{examResult.questionsFlagged}</span></div>
              </div>
            </div>
          </div>
        </header>
        <section>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '600', textAlign: 'center', marginBottom: '2rem', color: currentTheme.text }}>Question Review with Explanations</h2>
          {questionResults.map((question) => (
            <div key={question.id} style={{ backgroundColor: currentTheme.cardBg, border: `1px solid ${currentTheme.border}`, borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: currentTheme.text, margin: '0' }}>Question {question.id}</h3>
                <span style={{ backgroundColor: question.isCorrect ? currentTheme.success : currentTheme.error, color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>{question.isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
              </div>
              <p style={{ fontSize: '1rem', color: currentTheme.text, marginBottom: '1.5rem', lineHeight: '1.5' }}>{question.question}</p>
              <div style={{ marginBottom: '1.5rem' }}>
                {question.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === question.correctAnswer
                  const isUserAnswer = optionIndex === question.userAnswer
                  let backgroundColor = currentTheme.cardBg
                  let borderColor = currentTheme.border
                  let textColor = currentTheme.text
                  if (isCorrect) { backgroundColor = `${currentTheme.success}20`; borderColor = currentTheme.success }
                  else if (isUserAnswer && !isCorrect) { backgroundColor = `${currentTheme.error}20`; borderColor = currentTheme.error }
                  return (
                    <div key={optionIndex} style={{ backgroundColor, border: `2px solid ${borderColor}`, borderRadius: '6px', padding: '1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: textColor }}>{option}</span>
                      {isCorrect && (<span style={{ color: currentTheme.success, fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>)}
                      {isUserAnswer && !isCorrect && (<span style={{ color: currentTheme.error, fontWeight: 'bold', fontSize: '1.2rem' }}>✗ Incorrect</span>)}
                    </div>
                  )
                })}
              </div>
              <div style={{ backgroundColor: `${currentTheme.accent}15`, border: `1px solid ${currentTheme.accent}50`, borderRadius: '6px', padding: '1rem' }}>
                <div style={{ fontWeight: '600', color: currentTheme.accent, marginBottom: '0.5rem' }}>Explanation:</div>
                <p style={{ color: currentTheme.text, margin: '0', lineHeight: '1.5' }}>{question.explanation}</p>
              </div>
            </div>
          ))}
        </section>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
          <button onClick={() => window.location.href = '/'} style={{ backgroundColor: currentTheme.accent, color: '#000000', border: 'none', padding: '1rem 2rem', fontSize: '1rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.3s ease' }}>Try Again</button>
          <button onClick={() => window.location.href = '/'} style={{ backgroundColor: 'transparent', color: currentTheme.text, border: `2px solid ${currentTheme.border}`, padding: '1rem 2rem', fontSize: '1rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.3s ease' }}>Back to Home</button>
        </div>
      </div>
    </div>
  )
}

export default AWSExamResultsPage

