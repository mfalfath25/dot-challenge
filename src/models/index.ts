export interface User {
  isSignedIn: boolean
  username?: string
}

export interface Quiz {
  category?: string
  correct_answer?: string
  difficulty?: string
  incorrect_answers?: string[]
  question?: string
  type?: string
}

export interface Score {
  totalScore?: number
  totalCorrect?: number
  totalIncorrect?: number
  totalAnswered?: number
}
