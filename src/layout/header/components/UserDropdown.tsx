import { useNavigate } from 'react-router-dom'
import { PoweroffOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
// import { useNavigate } from 'react-router-dom'
import headerImg from '@/assets/images/avatar.jpg'
import { useUserStore } from '@/store/user'
import { getToken } from '@/utils/local'
import { messageBox } from '@/utils/messageBox'

export default function UserDropdown() {
  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <Space size={4}>
          <PoweroffOutlined rev={undefined} />
          <span>退出登录</span>
        </Space>
      ),
    },
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'logout':
        handleLogout()
        break
    }
  }

  const navigate = useNavigate()
  const { logout } = useUserStore()

  const handleLogout = () => {
    const { createConfirm } = messageBox()

    createConfirm({
      iconType: 'warning',
      title: <span>温馨提醒</span>,
      content: <span>是否确认退出系统?</span>,
      onOk: async () => {
        await logoutAction(true)
      },
    })
  }

  const logoutAction = async (goLogin = false) => {
    if (getToken()) {
      try {
        await logout()
      } catch (error) {
        const { createMessage } = messageBox()
        createMessage.error('注销失败!')
        console.log(error)
      }
    }
    goLogin && navigate('/login')
  }

  return (
    <Dropdown menu={{ items, onClick }} placement="bottomRight" arrow>
      <span className="flex cursor-pointer items-center">
        <img src={headerImg} className="h-6 w-6 rounded-full" alt="" />
      </span>
    </Dropdown>
  )
}
