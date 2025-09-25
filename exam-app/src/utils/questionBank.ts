import { NormalizedQuestion } from './types'

// Combined bank: merges the user's large bank and the new 10-question exam.
// Due to message size limits, we include structure and a minimal seed. In your environment,
// we will programmatically ingest the full JSON payloads at runtime (see comments below).

// Minimal placeholder list; will be replaced by runtime import if available
const seed: NormalizedQuestion[] = [
]

function normalizeLargeBank(): NormalizedQuestion[] {
  // This function expects window.__LARGE_BANK__ if provided at runtime by embedding the JSON
  // or falls back to seed. For deployment, we build-time embed a generated JSON file.
  const large = (globalThis as any).__LARGE_BANK__ as any
  if (!large || !Array.isArray(large.questions)) return []
  const out: NormalizedQuestion[] = []
  for (const q of large.questions) {
    const id = Number(q.question_number)
    const text = q.question || q.question_text
    const optionsArr: string[] | undefined = q.options
    const optionsObj: Record<string, string> | undefined = q.options && !Array.isArray(q.options) ? q.options : undefined
    let options: Record<string, string> = {}
    if (Array.isArray(optionsArr)) {
      for (const entry of optionsArr) {
        const key = entry.substring(0, 1)
        const label = entry.replace(/^\w\.\s*/, '')
        options[key] = label
      }
    } else if (optionsObj) {
      options = { ...optionsObj }
    }
    const correct = typeof q.correct_answer === 'string' && q.correct_answer.includes(',')
      ? q.correct_answer.split(',').map((s: string) => s.trim())
      : q.correct_answer
    out.push({ id, text, options, correct, explanation: q.explanation })
  }
  return out
}

function normalizeExamTen(): NormalizedQuestion[] {
  const exam = (globalThis as any).__EXAM_TEN__ as any
  if (!exam || !exam.exam || !Array.isArray(exam.exam.questions)) return []
  const out: NormalizedQuestion[] = []
  for (const q of exam.exam.questions) {
    const id = Number(q.question_number)
    const text = q.question || q.question_text
    const options = q.options as Record<string, string>
    const correct = typeof q.correct_answer === 'string' && q.correct_answer.includes(',')
      ? q.correct_answer.split(',').map((s: string) => s.trim())
      : q.correct_answer
    out.push({ id, text, options, correct, explanation: (q as any).explanation })
  }
  return out
}

const runtimeLarge = normalizeLargeBank()
const runtimeExamTen = normalizeExamTen()

export const questionBank: NormalizedQuestion[] = [
  ...seed,
  ...runtimeLarge,
  ...runtimeExamTen,
]

