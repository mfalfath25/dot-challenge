import { MantineProvider } from "@mantine/core"
import "./app.css"
import Router from "./routes/Router"

export function App() {
  return (
    <>
      <MantineProvider
        theme={{
          fontFamily: "Greycliff CF, sans-serif",
          fontFamilyMonospace: "Monaco, Courier, monospace",
          colorScheme: "light",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Router />
      </MantineProvider>
    </>
  )
}
