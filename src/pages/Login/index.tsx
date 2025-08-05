import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, type InputRef, message } from 'antd'
import { frontedBlogApi } from '@/api'
import { getToken, setToken } from '@/utils/local'

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

  // #region 游客登录
  const handleGuestAccess = async () => {
    const { accessToken } = await frontedBlogApi.guestAccess()
    setToken(accessToken)
    afterLoginAction(true)
    message.success('登录成功')
  }
  // #endregion

  // #region 管理员登录
  const handleAdminLogin = async () => {
    const { password, username } = await form.validateFields()
    const { accessToken } = await frontedBlogApi.adminLogin({
      username,
      password,
    })
    setToken(accessToken)
    afterLoginAction(true)
    message.success('登录成功')
  }
  // #endregion

  // #region 处理回车键登录逻辑
  const passwordInputRef = React.useRef<InputRef>(null) // 用于检测密码输入框焦点
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      // 检查焦点是否在密码输入框
      const isPasswordFocused =
        document.activeElement === passwordInputRef.current?.input

      if (isPasswordFocused) {
        handleAdminLogin()
      } else {
        handleGuestAccess()
      }
    }
  }

  // 添加全局键盘事件监听
  React.useEffect(() => {
    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [])
  // #endregion

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
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
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
                  message: '请输入密码!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                ref={passwordInputRef}
              />
            </Form.Item>
          </Form>
          <div className="flex w-full justify-between px-4">
            <Button type="primary" onClick={handleGuestAccess}>
              游客
            </Button>
            <Button type="primary" htmlType="submit" onClick={handleAdminLogin}>
              管理员
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
