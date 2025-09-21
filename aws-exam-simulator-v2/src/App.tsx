import { useEffect, useMemo, useState } from 'react'

type Question = {
  id: string
  text: string
  choices: string[]
  correctIndices: number[]
  explanation?: string
}

const QUESTION_SET_SIZE = 65
const EXAM_DURATION_SECONDS = 130 * 60

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [phase, setPhase] = useState<'landing'|'exam'|'results'>('landing')
  const [allQuestions, setAllQuestions] = useState<Question[] | null>(null)
  const [sessionIds, setSessionIds] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [selectedById, setSelectedById] = useState<Record<string, number[]>>({})
  const [remaining, setRemaining] = useState(EXAM_DURATION_SECONDS)
  const [paused, setPaused] = useState(false)
  const [flagged, setFlagged] = useState<Record<string, boolean>>({})
  const [starting, setStarting] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (phase !== 'exam') return
    if (paused || remaining <= 0) return
    const id = setInterval(() => setRemaining(r => Math.max(0, r-1)), 1000)
    return () => clearInterval(id)
  }, [phase, paused, remaining])

  const byId = useMemo(() => {
    const m = new Map<string, Question>()
    for (const q of allQuestions ?? []) m.set(q.id, q)
    return m
  }, [allQuestions])

  const currentId = sessionIds[index]
  const currentQ = currentId ? byId.get(currentId) ?? null : null

  async function start() {
    try {
      setStarting(true)
      setErr(null)
      // Always fetch questions at start (avoid preload race)
      const res = await fetch('/questions.json', { cache: 'no-store' })
      if (!res.ok) throw new Error(`Failed to load questions.json: ${res.status}`)
      const json = await res.json()
      const normalizeChoice = (s: string) => {
        const m = String(s ?? '').match(/^\s*[A-Za-z]\s*[\).]\s*(.*)$/)
        return (m ? m[1] : String(s ?? '')).trim()
      }
      const letterToIndex = (letter: string): number | null => {
        const L = letter.trim().toUpperCase()
        if (!L) return null
        const d = L.charCodeAt(0) - 'A'.charCodeAt(0)
        return d >= 0 && d < 26 ? d : null
      }
      const parseCorrect = (val: any, n: number): number[] => {
        if (Array.isArray(val)) return Array.from(new Set(val.map((v: any) => Number(v)).filter((x:number)=>Number.isInteger(x)&&x>=0&&x<n)))
        if (typeof val === 'number') return val>=0&&val<n ? [val] : []
        if (typeof val === 'string') {
          const parts = val.split(/[,/\\|\s]+/).map((p:string)=>p.trim()).filter(Boolean)
          const idxs = parts.map(letterToIndex).filter((x):x is number => x!==null && x>=0 && x<n)
          return Array.from(new Set(idxs))
        }
        return []
      }
      const questions: Question[] = (json.questions ?? [])
        .map((q: any, i: number) => {
          const id = String(q.id ?? q.question_number ?? i)
          const text = String(q.text ?? q.question ?? '')
          const choices: string[] = (Array.isArray(q.choices ?? q.options) ? (q.choices ?? q.options) : []).map((c:any)=>normalizeChoice(String(c ?? '')))
          const correct = parseCorrect(q.correct_answer ?? q.correctAnswer ?? q.correctIndices ?? q.correctIndex ?? q.answerIndex ?? q.answers, choices.length)
          return { id, text, choices, correctIndices: correct, explanation: q.explanation } as Question
        })
        .filter((q: Question) => q.text && q.choices.length > 0 && q.correctIndices.length > 0)
      if (questions.length === 0) throw new Error('No valid questions in questions.json')
      setAllQuestions(questions)
      const ids = shuffle(questions).slice(0, Math.min(QUESTION_SET_SIZE, questions.length)).map(q=>q.id)
      setSessionIds(ids)
      setIndex(0)
      setSelectedById({})
      setFlagged({})
      setRemaining(EXAM_DURATION_SECONDS)
      setPaused(false)
      setPhase('exam')
    } catch (e:any) {
      setErr(e?.message ?? 'Failed to start exam')
      alert(e?.message ?? 'Failed to start exam')
    } finally {
      setStarting(false)
    }
  }

  const isCorrect = (sel: number[], cor: number[]) => sel.length===cor.length && [...sel].sort().every((v,i)=>v===[...cor].sort()[i])

  if (phase === 'landing') {
    return (
      <div style={{ minHeight:'100vh', padding:'0', margin:0 }}>
        <div style={{ position:'fixed', top:'1rem', right:'1rem', zIndex:1000 }}>
          <button onClick={start} style={{ background:'#ff9800', border:'none', color:'#000', padding:'0.5rem 1rem', borderRadius:6 }}>{starting?'Starting…':'Start Practice Exam'}</button>
        </div>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'2rem 1rem', textAlign:'center' }}>
          <h1 style={{ fontSize:'2.5rem', margin:'0 0 0.5rem 0' }}>AWS Solutions Architect Associate SAA-C03</h1>
          <h2 style={{ fontSize:'1.3rem', color:'#ff9800', margin:0 }}>Practice Exam Simulator</h2>
          <p style={{ marginTop:'1.5rem', opacity:0.8 }}>65 questions • 130 minutes</p>
          {err && <p style={{ color:'#f44336' }}>{err}</p>}
        </div>
      </div>
    )
  }

  if (phase === 'exam') {
    const q = currentQ
    if (!q) return <div style={{ padding:20 }}>Preparing questions…</div>
    const selected = selectedById[q.id] ?? []
    const isMulti = (q.correctIndices?.length ?? 0) > 1
    const toggle = (i:number) => setSelectedById(prev => {
      const cur = prev[q.id] ?? []
      let next: number[]
      if (isMulti) next = cur.includes(i) ? cur.filter(x=>x!==i) : [...cur, i]
      else next = cur.includes(i) ? [] : [i]
      return { ...prev, [q.id]: next }
    })
    const next = () => setIndex(i => Math.min(sessionIds.length-1, i+1))
    const prev = () => setIndex(i => Math.max(0, i-1))
    const finish = () => setPhase('results')
    return (
      <div style={{ padding:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div>
            <strong>Question {index+1} / {sessionIds.length}</strong>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <div style={{ background:'#00000022', color:'#fff', padding:'6px 10px', borderRadius:6, fontFamily:'monospace' }}>{Math.floor(remaining/60).toString().padStart(2,'0')}:{(remaining%60).toString().padStart(2,'0')}</div>
            <button onClick={()=>setPaused(p=>!p)}>{paused?'Resume':'Pause'}</button>
            <button onClick={()=>setFlagged(prev=>({ ...prev, [q.id]: !prev[q.id] }))} style={{ borderColor: flagged[q.id]?'#ff9800':undefined }}>Flag</button>
          </div>
        </div>
        <div style={{ marginBottom:16, fontSize:'1.1rem', lineHeight:1.6 }}>{q.text}</div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {q.choices.map((c, i) => (
            <label key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:12, border:'2px solid #404040', borderRadius:8, background:'#2d2d2d' }}>
              <input type={isMulti?'checkbox':'radio'} name={`q-${q.id}`} checked={selected.includes(i)} onChange={()=>toggle(i)} />
              <span>{c}</span>
            </label>
          ))}
        </div>
        <div style={{ display:'flex', gap:8, justifyContent:'space-between', marginTop:16 }}>
          <button onClick={prev} disabled={index===0}>Previous</button>
          <div />
          {index < sessionIds.length-1 ? (
            <button onClick={next}>Next</button>
          ) : (
            <button onClick={finish}>Finish</button>
          )}
        </div>
      </div>
    )
  }

  // Results
  const results = sessionIds.map(id => {
    const q = byId.get(id)!
    const sel = selectedById[id] ?? []
    const ok = isCorrect(sel, q.correctIndices)
    return { q, sel, ok }
  })
  const score = results.filter(r=>r.ok).length
  return (
    <div style={{ padding:20 }}>
      <h1>Results</h1>
      <p>Score: {score} / {sessionIds.length}</p>
      <div style={{ display:'flex', flexDirection:'column', gap:16, marginTop:16 }}>
        {results.map(({ q, sel, ok }, idx) => (
          <div key={q.id} style={{ padding:16, border:'1px solid #404040', borderLeft:`5px solid ${ok?'#4caf50':'#f44336'}`, borderRadius:8 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <strong>Question {idx+1}</strong>
              <span style={{ color: ok?'#4caf50':'#f44336' }}>{ok?'✓ Correct':'✗ Incorrect'}</span>
            </div>
            <div style={{ marginBottom:12 }}>{q.text}</div>
            <ul>
              {q.choices.map((c,i)=>{
                const isRight = q.correctIndices.includes(i)
                const isUser = sel.includes(i)
                return (
                  <li key={i} style={{ marginBottom:6 }}>
                    {c} {isRight?'✓':''} {isUser && !isRight?'(your choice)':''}
                  </li>
                )
              })}
            </ul>
            {q.explanation && <div><strong>Explanation:</strong> {q.explanation}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
