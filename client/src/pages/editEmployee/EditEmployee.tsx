import React, { useState } from "react"
import { Layout } from "../../components/Layout/Layout"
import { Row } from "antd"
import { EmployeeForm } from "../../components/EmployeeForm/EmployeeForm"
import { useNavigate, useParams } from "react-router-dom"
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees"
import { Loader } from "../../components/Loader/Loader"
import { Employee } from "@prisma/client"
import { Paths } from "../../paths/paths"
import { isErrorWithMessage } from "../../utils/isErrorWithMessage"

export const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [errorMessage, setErrorMessage] = useState("")
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [editEmployee] = useEditEmployeeMutation()
  if (isLoading) return <Loader />
  const editEmployeeHandler = async (employee: Employee) => {
    try {
        const editedEmployee = {
            ...data,
            ...employee
        }
        await editEmployee(editedEmployee).unwrap()
        navigate(`${Paths.status}/updated`)
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
          title="Редактировать сотрудника"
          btnText="Редактировать"
          onFinish={editEmployeeHandler}
          error={errorMessage}
          employee={data}
        />
      </Row>
    </Layout>
  )
}
