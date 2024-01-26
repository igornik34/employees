import React, { useEffect, useState } from "react"
import { Layout } from "../../components/Layout/Layout"
import { Row } from "antd"
import { EmployeeForm } from "../../components/EmployeeForm/EmployeeForm"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { useAddEmployeeMutation } from "../../app/services/employees"
import { Paths } from "../../paths/paths"
import { Employee } from "@prisma/client"
import { isErrorWithMessage } from "../../utils/isErrorWithMessage"

export const AddEmployee = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [addEmployee] = useAddEmployeeMutation()
  useEffect(() => {
    if (!user) {
      navigate(Paths.login)
    }
  }, [user, navigate])

  const addEmployeeHandler = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()
      navigate(`${Paths.status}/created`)
    } catch (error) {
      const maybeError = isErrorWithMessage(error)
      if (maybeError) {
        setErrorMessage(error.data.message)
      } else {
        setErrorMessage("Неизвестная ошибка")
      }
    }
  }
  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={addEmployeeHandler}
          error={errorMessage}
        />
      </Row>
    </Layout>
  )
}
