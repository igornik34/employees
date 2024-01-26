import React, { useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employees"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice"
import { Descriptions, Divider, Modal, Space } from "antd"
import { Loader } from "../../components/Loader/Loader"
import { Paths } from "../../paths/paths"
import { Layout } from "../../components/Layout/Layout"
import { CustomButton } from "../../components/CustomButton/CustomButton"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage"
import { isErrorWithMessage } from "../../utils/isErrorWithMessage"

export const Employee = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")
  const params = useParams<{ id: string }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [removeEmployee] = useRemoveEmployeeMutation()
  const user = useSelector(selectUser)

  if (isLoading) {
    return <Loader />
  }

  if (!data) {
    return <Navigate to={Paths.home} />
  }

  const showModalHandler = () => {
    setIsModalOpen(true)
  }
  const hideModalHandler = () => {
    setIsModalOpen(false)
  }

  const removeEmployeeHandler = async () => {
    hideModalHandler()

    try {
      await removeEmployee(data.id).unwrap()
      navigate(`${Paths.status}/deleted`)
    } catch (error) {
      const maybeError = isErrorWithMessage(error)
      if (maybeError) setErrorMessage(error.data.message)
      else setErrorMessage("Неизвестная ошибка!")
    }
  }

  return (
    <Layout>
      <Descriptions title="Информация о сотруднике" bordered={true}>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Возраст" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModalHandler}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={errorMessage} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={removeEmployeeHandler}
        onCancel={hideModalHandler}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить сотрудника из таблицы?
      </Modal>
    </Layout>
  )
}
