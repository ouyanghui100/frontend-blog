import React from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { frontedBlogApi } from '@/api'
import { getToken, setToken } from '@/utils/local'
import { useNavigate, useSearchParams } from 'react-router-dom'
const LoginPage: React.FC = () => {
  type FieldType = {
    username?: string
    password?: string
  }
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm()

  const afterLoginAction = (goHome?: boolean) => {
    if (!getToken()) return null

    const redirect = searchParams.get('redirect')
    if (redirect) {
      navigate(redirect)
    } else {
      goHome && navigate('/home')
    }
  }

  const handleGuestAccess = async () => {
    const { accessToken } = await frontedBlogApi.guestAccess()
    setToken(accessToken)
    afterLoginAction(true)
  }

  // const handleAdminLogin = async (values: FieldType) => {

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-1/2 items-center justify-center bg-[#12538f] p-[40px] text-[70px] font-[700] text-[#fff]">
        个人博客后台管理系统
      </div>
      <div className="flex h-full w-1/2 flex-col items-center justify-center bg-[#fff]">
        <div className="max-w-[640px] min-w-[320px]">
          <Form
            form={form}
            name="login-form"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>
          </Form>
          <div className="flex w-full justify-between px-4">
            <Button type="primary" onClick={handleGuestAccess}>
              游客
            </Button>
            <Button type="primary" htmlType="submit">
              管理员
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
