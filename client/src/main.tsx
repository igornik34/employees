import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Paths } from "./paths/paths"
import { Login } from "./pages/login/Login"
import { Register } from "./pages/register/Register"
import "./index.css"
import { ConfigProvider, theme } from "antd"
import { Auth } from "./features/auth/auth"
import { Employees } from "./pages/employees/employees"
import { AddEmployee } from "./pages/addEmployee/AddEmployee"
import { Status } from "./pages/status/Status"
import { Employee } from "./pages/employee/Employee"
import { EditEmployee } from "./pages/editEmployee/EditEmployee"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <Auth>
            <RouterProvider router={router} />
          </Auth>
        </ConfigProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
