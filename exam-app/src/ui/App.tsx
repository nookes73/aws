import React, { useMemo, useState } from 'react'
import { questionBank } from '../utils/questionBank'
import { pickRandomQuestions } from '../utils/pickRandom'

type Answer = string | string[]

export const App: React.FC = () => {
  const questions = useMemo(() => pickRandomQuestions(questionBank, 65), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [submitted, setSubmitted] = useState(false)

  const current = questions[currentIndex]

  function isMulti(q: typeof current): boolean {
    if (Array.isArray(q.correct)) return true
    if (typeof q.correct === 'string' && q.correct.includes(',')) return true
    return false
  }

  function toggleChoice(choice: string) {
    setAnswers(prev => {
      const key = current.id
      const prevVal = prev[key]
      if (isMulti(current)) {
        const list = Array.isArray(prevVal) ? prevVal : []
        const exists = list.includes(choice)
        const next = exists ? list.filter(c => c !== choice) : [...list, choice]
        return { ...prev, [key]: next }
      } else {
        return { ...prev, [key]: choice }
      }
    })
  }

  function next() {
    setCurrentIndex(i => Math.min(i + 1, questions.length - 1))
  }
  function prev() {
    setCurrentIndex(i => Math.max(i - 1, 0))
  }
  function submit() {
    setSubmitted(true)
  }

  function score() {
    let correctCount = 0
    for (const q of questions) {
      const user = answers[q.id]
      const correct = Array.isArray(q.correct)
        ? q.correct
        : typeof q.correct === 'string' && q.correct.includes(',')
          ? q.correct.split(',').map(s => s.trim())
          : [q.correct as string]
      const userList = Array.isArray(user) ? user : typeof user === 'string' ? [user] : []
      const a = [...correct].sort().join('|')
      const b = [...userList].sort().join('|')
      if (a === b) correctCount += 1
    }
    return correctCount
  }

  if (!current) return <div style={{ padding: 24 }}>No questions available.</div>

  const total = questions.length
  const result = submitted ? score() : null

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ marginBottom: 8 }}>AWS Solutions Architect Associate (SAA-C03) Practice Exam</h1>
      <div style={{ color: '#555', marginBottom: 16 }}>65 randomized questions from the full bank</div>

      {!submitted && (
        <div>
          <div style={{ marginBottom: 8 }}>Question {currentIndex + 1} of {total}</div>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>{current.text}</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {Object.entries(current.options).map(([key, label]) => {
              const multi = isMulti(current)
              const val = answers[current.id]
              const checked = Array.isArray(val) ? val.includes(key) : val === key
              return (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
                  <input
                    type={multi ? 'checkbox' : 'radio'}
                    name={`q-${current.id}`}
                    checked={!!checked}
                    onChange={() => toggleChoice(key)}
                  />
                  <span><strong>{key}.</strong> {label}</span>
                </label>
              )
            })}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button onClick={prev} disabled={currentIndex === 0}>Previous</button>
            <button onClick={next} disabled={currentIndex === total - 1}>Next</button>
            {currentIndex === total - 1 && (
              <button onClick={submit} style={{ marginLeft: 'auto' }}>Submit</button>
            )}
          </div>
        </div>
      )}

      {submitted && (
        <div>
          <h2>Results</h2>
          <div style={{ marginBottom: 16 }}>Score: {result} / {total}</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {questions.map((q, idx) => {
              const correct = Array.isArray(q.correct) ? q.correct : typeof q.correct === 'string' && q.correct.includes(',') ? q.correct.split(',').map(s => s.trim()) : [q.correct as string]
              const user = answers[q.id]
              const userList = Array.isArray(user) ? user : typeof user === 'string' ? [user] : []
              const ok = [...correct].sort().join('|') === [...userList].sort().join('|')
              return (
                <div key={q.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontWeight: 600 }}>
                    {idx + 1}. {q.text}
                    <span style={{ marginLeft: 8, color: ok ? 'green' : 'crimson' }}>{ok ? 'Correct' : 'Incorrect'}</span>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <div><strong>Your answer:</strong> {userList.join(', ') || '—'}</div>
                    <div><strong>Correct:</strong> {correct.join(', ')}</div>
                    {q.explanation && (
                      <div style={{ marginTop: 6, color: '#444' }}><strong>Explanation:</strong> {q.explanation}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

