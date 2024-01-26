import React from "react"
import { useCurrentQuery } from "../../app/services/auth"
import { Row, Spin } from "antd"
import { Layout } from "../../components/Layout/Layout"
import { Loader } from "../../components/Loader/Loader"

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()
  if (isLoading) {
    return (
        <Loader/>
    )
  }
  return children
}
