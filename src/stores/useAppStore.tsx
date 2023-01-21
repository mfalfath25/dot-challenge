import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { Quiz, Score, User } from "../models"

interface AppStore extends User {
  currentQuiz: Quiz[]
  multipleChoice: string[][]
  answers: string[]
  score: Score
  timeLeft: number
  globalInterval: number
  login: () => void
  logout: () => void
  setUser: (data: any) => void
  setQuiz: (data: any) => void
  setAnswers: (data: any) => void
  setScore: (data: any) => void
  setTimeLeft: (data: any) => void
  setGlobalInterval: (data: any) => void
  clearCurrentQuiz: () => void
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        currentQuiz: [],
        multipleChoice: [],
        answers: [],
        score: {
          totalCorrect: 0,
          totalIncorrect: 0,
          totalAnswered: 0,
          totalScore: 0,
        },
        timeLeft: 0,
        globalInterval: 0,
        isSignedIn: false,
        username: "",
        login: () => {
          set((state) => ({ ...state, isSignedIn: true }))
        },
        logout: () => {
          set((state) => ({ ...state, isSignedIn: false }))
        },
        setUser: (data) => {
          set((state) => ({
            ...state,
            username: data.username,
          }))
        },
        setQuiz: (data) => {
          set((state) => ({
            ...state,
            currentQuiz: data,
            multipleChoice: data.map((question: any) => {
              return [question.correct_answer, ...question.incorrect_answers].sort(
                () => Math.random() - 0.5
              )
            }),
            timeLeft: 60000,
            globalInterval: 0,
          }))
        },
        setAnswers: (data) => {
          set((state) => ({
            ...state,
            answers: data,
          }))
        },
        setScore: (data) => {
          set((state) => ({
            ...state,
            score: {
              totalCorrect: data.totalCorrect,
              totalIncorrect: data.totalIncorrect,
              totalAnswered: data.totalAnswered,
              totalScore: data.totalScore,
            },
          }))
        },
        setTimeLeft: (data) => {
          set((state) => ({
            ...state,
            timeLeft: data,
          }))
        },
        setGlobalInterval: (data) => {
          set((state) => ({
            ...state,
            globalInterval: data.globalInterval,
          }))
        },
        clearCurrentQuiz: () => {
          set((state) => ({
            ...state,
            currentQuiz: [],
            multipleChoice: [],
            answers: [],
            score: {
              totalCorrect: 0,
              totalIncorrect: 0,
              totalAnswered: 0,
              totalScore: 0,
            },
            timeLeft: 0,
            globalInterval: 0,
          }))
        },
      }),
      {
        name: "user-store",
      }
    )
  )
)
