import { Button, Layout, Space, Typography } from "antd"
import classes from "./Header.module.css"
import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { CustomButton } from "../CustomButton/CustomButton"
import { Link, useNavigate } from "react-router-dom"
import { Paths } from "../../paths/paths"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../features/auth/authSlice"
import { useEffect } from "react"

export const Header = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {}, [])

  const onLogoutHandler = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate(Paths.login)
  }
  return (
    <Layout.Header className={classes.header}>
      <Space>
        <TeamOutlined className={classes.teamIcon} />
        <Link to={Paths.home}>
          <Typography.Title level={1}>Сотрудники</Typography.Title>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          danger={true}
          type="primary"
          icon={<LogoutOutlined />}
          onClick={onLogoutHandler}
        >
          Выйти
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton icon={<UserOutlined />}>
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton icon={<LoginOutlined />}>Войти</CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  )
}
