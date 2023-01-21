import { Center, Grid, Text, Paper, Group, Button, Flex, Box } from "@mantine/core"
import { useEffect } from "preact/hooks"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export const Result = () => {
  const navigate = useNavigate()
  const { currentQuiz, score, clearCurrentQuiz } = useAppStore()

  useEffect(() => {
    if (currentQuiz.length === 0) {
      navigate("/home")
    }
  }, [currentQuiz])

  return (
    <>
      <Center h={"80vh"}>
        <Paper shadow="md" radius="md" p="md" w={350} withBorder>
          <Grid>
            <Grid.Col span={12}>
              <Center>
                <Text fz={24} fw={700}>
                  Your final score is {score.totalScore}
                </Text>
              </Center>
            </Grid.Col>
            <Grid.Col span={12}>
              <Flex align="center" justify="space-between" direction="row">
                <Center w={100}>
                  <Box>
                    <Text fz={"lg"} fw={700}>
                      Answered
                    </Text>
                    <Center
                      sx={{
                        backgroundColor: "#4DABF7",
                        borderRadius: 4,
                        boxShadow: "0 0 0 1px #228BE6",
                      }}
                      w={30}
                      h={30}
                      mx={"auto"}
                    >
                      <Text fz={24} fw={900}>
                        {score.totalAnswered}
                      </Text>
                    </Center>
                  </Box>
                </Center>
                <Center w={100}>
                  <Box>
                    <Text fz={"lg"} fw={700}>
                      Correct
                    </Text>
                    <Center
                      sx={{
                        backgroundColor: "#A9E34B",
                        borderRadius: 4,
                        boxShadow: "0 0 0 1px #82C91E",
                      }}
                      w={30}
                      h={30}
                      mx={"auto"}
                    >
                      <Text fz={24} fw={900}>
                        {score.totalCorrect}
                      </Text>
                    </Center>
                  </Box>
                </Center>
                <Center w={100}>
                  <Box>
                    <Text fz={"lg"} fw={700}>
                      Incorrect
                    </Text>
                    <Center
                      sx={{
                        backgroundColor: "#FF8787",
                        borderRadius: 4,
                        boxShadow: "0 0 0 1px #FA5252",
                      }}
                      w={30}
                      h={30}
                      mx={"auto"}
                    >
                      <Text fz={24} fw={900}>
                        {score.totalIncorrect}
                      </Text>
                    </Center>
                  </Box>
                </Center>
              </Flex>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="center">
                <Button variant="light" onClick={() => clearCurrentQuiz()}>
                  Home
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>
      </Center>
    </>
  )
}
