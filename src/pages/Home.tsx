import { Text, Center, Paper, List, Button, Group, Grid, Input, Flex } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconChevronDown } from "@tabler/icons"
import { useNavigate } from "react-router-dom"
import { baseApi } from "../api/baseApi"
import { useAppStore } from "../stores/useAppStore"

export const Home = () => {
  const navigate = useNavigate()
  const { username, setQuiz, currentQuiz, clearCurrentQuiz } = useAppStore()
  const form = useForm({
    initialValues: {
      difficulty: "easy",
    },
  })

  const handleSubmit = () => {
    baseApi
      .get("", {
        params: {
          difficulty: form.values.difficulty,
        },
      })
      .then((res) => {
        setQuiz(res.data.results)
        navigate("/quiz")
      })
      .catch((err) => {
        console.log(err)
        console.log("opentdb API error")
      })
  }

  return (
    <>
      <Center h={"80vh"}>
        <Grid grow>
          <Grid.Col span={12}>
            <Text pt={20} fz={24} fw={700}>
              Hi {username}, Welcome to the Trivia Challenge!
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper shadow="md" radius="md" p="md" h={150} withBorder>
              <Text fz={"lg"} fw={700}>
                How to play?
              </Text>
              <List>
                <List.Item>Choose your difficulty (Easy-Medium-Hard) 🤔</List.Item>
                <List.Item>You will be given 1️⃣ minute to answer 5️⃣ questions</List.Item>
                <List.Item>The Trivia Quiz will be about general knowledge 🌍</List.Item>
              </List>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}>
            <Paper shadow="md" radius="md" p="md" h={150} withBorder>
              {currentQuiz.length > 0 ? (
                <>
                  <Flex
                    mih={"100%"}
                    gap="md"
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                  >
                    <Text fz="lg" fw={700}>
                      You have an active quiz in progress 😲
                    </Text>
                    <Group position="center">
                      <Button onClick={() => navigate("/quiz")}>Resume</Button>
                      <Button onClick={() => clearCurrentQuiz()} variant={"light"}>
                        Start over
                      </Button>
                    </Group>
                  </Flex>
                </>
              ) : (
                <>
                  <Text fz="lg" fw={700}>
                    Choose difficulty
                  </Text>
                  <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Input
                      pb={6}
                      component="select"
                      {...form.getInputProps("difficulty")}
                      rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </Input>

                    <Group position="center">
                      <Button type="submit">Play</Button>
                    </Group>
                  </form>
                </>
              )}
            </Paper>
          </Grid.Col>
        </Grid>
      </Center>
    </>
  )
}
