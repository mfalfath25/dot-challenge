import { Quiz } from "../models"

export const decodeHtmlCharCodes = (text: string = "") => {
  let textArea = document.createElement("textarea")
  textArea.innerHTML = text
  return textArea.value
}

export const calculateScore = (quiz: Quiz[], answer: string[]) => {
  let correct = 0

  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === quiz[i].correct_answer) {
      correct++
    }
  }

  return correct
}

export const stopInterval = (intervalId: number) => {
  clearInterval(intervalId)
}
