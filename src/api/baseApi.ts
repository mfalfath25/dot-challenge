import axios from "axios"

export const baseApi = axios.create({
  baseURL: "https://opentdb.com/api.php",
  params: {
    amount: 5,
    category: 9,
    type: "multiple",
  },
})
