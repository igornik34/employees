import React, { useState } from "react"
import { Layout } from "../../components/Layout/Layout"
import { Card, Form, Row, Space, Typography } from "antd"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { PasswordInput } from "../../components/PasswordInput/PasswordInput"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { Link, useNavigate } from "react-router-dom"
import { Paths } from "../../paths/paths"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { useRegisterMutation } from "../../app/services/auth"
import { User } from "@prisma/client"
import { isErrorWithMessage } from "../../utils/isErrorWithMessage"
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage"

type RegisterData = Omit<User, "id"> & { confirmPassword: string }

export const Register = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [errorMessage, setErrorMessage] = useState("")
  const [registerUser] = useRegisterMutation()

  const registerHandler = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap()
      navigate(Paths.home)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      if (maybeError) {
        setErrorMessage(err.data.message)
      } else {
        setErrorMessage("Неизвестная ошибка!")
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={registerHandler}>
            <CustomInput type="text" name="name" placeholder="Имя" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Повторите пароль"
            />
            <CustomButton type="primary" htmlType="submit">
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже есть аккаунт? <Link to={Paths.login}>Войдите!</Link>
            </Typography.Text>
            <ErrorMessage message={errorMessage} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
