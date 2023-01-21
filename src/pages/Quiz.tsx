import {
  Pagination,
  Center,
  Grid,
  Text,
  Paper,
  Modal,
  Group,
  Button,
  Flex,
  Box,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconCheck, IconX } from "@tabler/icons"
import { useEffect, useState } from "preact/hooks"
import { useNavigate } from "react-router-dom"
import { Timer } from "../components"
import { useAppStore } from "../stores/useAppStore"
import { calculateScore, decodeHtmlCharCodes } from "../utils/functions"

export const Quiz = () => {
  const navigate = useNavigate()
  const { currentQuiz, multipleChoice, answers, timeLeft, setAnswers, setScore } = useAppStore()
  const [activePage, setPage] = useState(1)
  const [opened, setOpened] = useState(false)

  const form = useForm({
    initialValues: {
      answers: answers.length > 0 ? answers : ["", "", "", "", ""],
    },
  })

  const handleSubmit = () => {
    setAnswers(form.values.answers)

    let score = calculateScore(currentQuiz, answers)

    setScore({
      totalScore: score * 20,
      totalCorrect: score,
      totalIncorrect: 5 - score,
      totalAnswered: answers.filter((answer) => answer !== "").length,
    })

    setTimeout(() => {
      navigate("/result")
    }, 1000)
  }

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft])

  return (
    <>
      <Center h={"80vh"}>
        <Modal
          opened={opened}
          centered
          onClose={() => setOpened(false)}
          title="Finalize your answers?"
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Group position="center">
              <Button type="submit" variant="light">
                Confirm <IconCheck size={18} />
              </Button>
              <Button onClick={() => setOpened(false)} variant="light" color="red">
                Cancel <IconX size={18} />
              </Button>
            </Group>
          </form>
        </Modal>

        <Grid grow gutter="xl">
          <Grid.Col span={12}>
            <Center>
              <Box w={400}>
                <Flex align="center" justify="space-between" direction="row">
                  <Text fz={"lg"} fw={700}>
                    Question {activePage}
                  </Text>
                  <Timer />
                </Flex>
              </Box>
            </Center>
          </Grid.Col>
          <Grid.Col span={12}>
            <Center>
              <Paper shadow="md" radius="md" p="md" w={400} withBorder>
                {currentQuiz.length > 0 ? (
                  currentQuiz.map((question, indexQuestion) => {
                    if (indexQuestion + 1 === activePage) {
                      return (
                        <div key={indexQuestion}>
                          <Text fw={700}>{decodeHtmlCharCodes(question.question)}</Text>
                          {multipleChoice[indexQuestion].map((answer, indexAnswer) => {
                            return (
                              <div key={indexAnswer}>
                                <label>
                                  <input
                                    key={indexAnswer}
                                    type="radio"
                                    name="answers"
                                    checked={answers[indexQuestion] === answer}
                                    value={answer}
                                    onChange={(e) => {
                                      form.values.answers[indexQuestion] = (
                                        e.target as HTMLInputElement
                                      ).value
                                      setAnswers(form.values.answers)
                                    }}
                                  />
                                  {" " + decodeHtmlCharCodes(answer)}
                                </label>
                              </div>
                            )
                          })}
                        </div>
                      )
                    }
                  })
                ) : (
                  <Text>Question unavailable</Text>
                )}
              </Paper>
            </Center>
          </Grid.Col>
          <Grid.Col span={12}>
            <Center>
              <Flex gap="md" justify="center" align="center" direction="column">
                <Pagination page={activePage} onChange={setPage} total={5} />
                <Button onClick={() => setOpened(true)} variant="light">
                  Submit
                </Button>
              </Flex>
            </Center>
          </Grid.Col>
        </Grid>
      </Center>
    </>
  )
}
