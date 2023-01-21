import { Loader, Center } from "@mantine/core"
import { useEffect } from "preact/hooks"
import { useNavigate } from "react-router-dom"

interface SpinnerProps {
  forwardTo: string
}

export const Spinner = ({ forwardTo }: SpinnerProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate({ pathname: forwardTo })
    }, 1000)
  }, [])
  return (
    <Center h={"100vh"}>
      <Loader color="indigo" />
    </Center>
  )
}
