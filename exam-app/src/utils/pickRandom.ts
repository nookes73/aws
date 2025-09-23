import { NormalizedQuestion } from './types'

export function shuffleInPlace<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function pickRandomQuestions(all: NormalizedQuestion[], count: number): NormalizedQuestion[] {
  const ids = new Set<number>()
  const pool = [...all]
  shuffleInPlace(pool)
  const selected: NormalizedQuestion[] = []
  for (const q of pool) {
    if (!ids.has(q.id)) {
      selected.push(q)
      ids.add(q.id)
      if (selected.length === count) break
    }
  }
  return selected
}

