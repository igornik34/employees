import { Button, Form } from "antd"
import React from "react"

type Props = {
  children: React.ReactNode
  htmlType?: "button" | "submit" | "reset"
  onClick?: () => void
  type?: "link" | "text" | "default" | "primary" | "dashed"
  danger?: boolean
  loading?: boolean
  shape?: "default" | "circle" | "round"
  icon?: React.ReactNode
  ghost?: boolean
}

export const CustomButton = ({
  children,
  htmlType,
  onClick,
  type,
  danger,
  loading,
  shape,
  icon,
  ghost,
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        onClick={onClick}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        ghost={ghost}
      >
        {children}
      </Button>
    </Form.Item>
  )
}
