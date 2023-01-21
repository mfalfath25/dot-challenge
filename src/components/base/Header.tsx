import { Center, Group, ActionIcon, Title } from "@mantine/core"
import { useAppStore } from "../../stores/useAppStore"
import { IconLogout } from "@tabler/icons"
import { Link } from "react-router-dom"

export const Header = () => {
  const { isSignedIn, logout } = useAppStore()

  return (
    <>
      {isSignedIn ? (
        <>
          <Group position="apart">
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Title order={2} className="header-title">
                TRIVIA
              </Title>
            </Link>

            <ActionIcon onClick={logout} variant="filled" color="red">
              <IconLogout size={18} />
            </ActionIcon>
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
