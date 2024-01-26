import { Header } from "../Header/Header"
import classes from "./Layout.module.css"
import { Layout as AntLayout } from "antd"

type Props = {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={classes.container}>
      <Header/>
      <AntLayout.Content style={{ height: "100%" }}>
        {children}
      </AntLayout.Content>
    </div>
  )
}
