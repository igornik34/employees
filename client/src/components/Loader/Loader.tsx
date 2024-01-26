import { Row, Spin } from "antd"
import React from "react"

export const Loader = () => {
  return (
    <Row align="middle" justify="center" style={{ height: "100%" }}>
      <Spin />
    </Row>
  )
}
