import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react"
import { Form, Input, InputProps } from "antd"

type Props = {
    name: string
    placeholder: string
    type?: HTMLInputTypeAttribute
}

export const CustomInput = ({ name, placeholder, type }: Props) => {
  return (
    <Form.Item name={name} rules={[{required: true, message: 'Обязательное поле'}]} shouldUpdate={true}>
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  )
}
