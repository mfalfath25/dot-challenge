import {
  Button,
  Center,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Container,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { Header, Spinner } from "../components"
import { useAppStore } from "../stores/useAppStore"

export const Login = () => {
  const { isSignedIn, login, setUser } = useAppStore()
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (value === "test123" ? null : "Username incorrect"),
      password: (value) => (value === "test123" ? null : "Password incorrect"),
    },
  })

  const handleSubmit = () => {
    setUser({ ...form.values, username: form.values.username })
    login()
  }

  return (
    <>
      <Container h={"100vh"}>
        {isSignedIn ? (
          <Spinner forwardTo="/home" />
        ) : (
          <>
            <Header />
            <Center h={700}>
              <Paper shadow="md" radius="md" p="md" withBorder>
                <Text fz="lg" fw={700}>
                  Login
                </Text>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <TextInput
                    withAsterisk
                    label="Username"
                    placeholder="Username"
                    {...form.getInputProps("username")}
                  />

                  <PasswordInput
                    withAsterisk
                    label="Password"
                    placeholder="Password"
                    {...form.getInputProps("password")}
                  />

                  <Group position="center" mt="md">
                    <Button type="submit">Sign In</Button>
                  </Group>
                </form>
              </Paper>
            </Center>
          </>
        )}
      </Container>
    </>
  )
}
