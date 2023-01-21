import { Container } from "@mantine/core"
import { useEffect } from "preact/hooks"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Header } from "../components"
import { useAppStore } from "../stores/useAppStore"

const Protected = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, globalInterval } = useAppStore()

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home")
    }

    if (!isSignedIn) {
      navigate("/login")
    }

    if (location.pathname !== "/quiz") {
      clearInterval(globalInterval)
    }
  }, [isSignedIn, location])

  return (
    <>
      <Container h={"100vh"} style={{ backgroundColor: "" }}>
        <Header />
        <Outlet />
      </Container>
    </>
  )
}

export default Protected
