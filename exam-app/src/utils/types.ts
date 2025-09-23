export type OptionMap = Record<string, string>

export type NormalizedQuestion = {
  id: number
  text: string
  options: OptionMap
  correct: string | string[]
  explanation?: string
}

