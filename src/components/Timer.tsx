import { Badge } from "@mantine/core"
import moment from "moment"

import { useEffect } from "preact/hooks"
import { useAppStore } from "../stores/useAppStore"

export const Timer = () => {
  const { timeLeft, setTimeLeft, setGlobalInterval } = useAppStore()

  useEffect(() => {
    let current = timeLeft
    let interval = setInterval(() => {
      if (current === 0) {
        clearInterval(interval)
        return
      }
      setGlobalInterval({
        globalInterval: interval,
      })
      current -= 1000
      setTimeLeft(current)
    }, 1000)
  }, [])

  return (
    <>
      <Badge color="red" size="xl" radius="md" variant="dot" style={{ textTransform: "none" }}>
        {moment.utc(timeLeft).format("mm[m]:ss[s]")}
      </Badge>
    </>
  )
}
