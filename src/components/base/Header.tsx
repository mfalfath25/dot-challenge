import { Center, Group, ActionIcon, Title, Flex } from "@mantine/core"
import { useAppStore } from "../../stores/useAppStore"
import { IconHome2, IconLogout } from "@tabler/icons"
import { Link, useLocation } from "react-router-dom"

export const Header = () => {
  const location = useLocation()
  const { isSignedIn, logout, clearCurrentQuiz } = useAppStore()

  return (
    <>
      {isSignedIn ? (
        <>
          <Group position="apart">
            <Title order={2} className="header-title">
              TRIVIA
            </Title>

            <Flex direction="row" gap="md">
              <Link to="/home" style={{ textDecoration: "none" }}>
                <ActionIcon
                  onClick={location.pathname === "/result" ? clearCurrentQuiz : null}
                  variant="filled"
                  color="blue"
                >
                  <IconHome2 size={18} />
                </ActionIcon>
              </Link>
              <ActionIcon onClick={logout} variant="filled" color="red">
                <IconLogout size={18} />
              </ActionIcon>
            </Flex>
          </Group>
        </>
      ) : (
        <>
          <Center>
            <Title order={2} className="header-title">
              TRIVIA
            </Title>
          </Center>
        </>
      )}
    </>
  )
}
