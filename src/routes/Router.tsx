import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Protected from "./Protected"
import { Home, Login, Quiz, Result } from "../pages"

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protected />,
      children: [
        { path: "/home", element: <Home /> },
        { path: "/quiz", element: <Quiz /> },
        { path: "/result", element: <Result /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "*", element: <div>404</div> },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Router
