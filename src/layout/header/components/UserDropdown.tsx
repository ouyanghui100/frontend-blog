import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PoweroffOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import type { User } from '@/api/frontedBlogApi'
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

  // #region 退出登录
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
  // #endregion

  // #region 获取用户信息
  const { getProfile } = useUserStore()
  const [userInfo, setUserInfo] = React.useState<User | null>(null)
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile()
        setUserInfo(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // #endregion

  // #region 头像
  return (
    <Dropdown menu={{ items, onClick }} placement="bottomRight" arrow>
      {userInfo?.role === 'admin' ? (
        <span className="flex cursor-pointer items-center gap-2">
          <span className="text-blue-500">管理员</span>
          <img src={headerImg} className="h-6 w-6 rounded-full" alt="" />
        </span>
      ) : (
        <div className="lh-10 flex h-10 w-10 items-center justify-center rounded-full bg-blue-300 text-[#fff]">
          游客
        </div>
      )}
    </Dropdown>
  )
}
