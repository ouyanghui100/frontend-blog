import type { MenuProps } from 'antd'
import { Space, Dropdown } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'
// import { useNavigate } from 'react-router-dom'
import headerImg from '@/assets/images/avatar.jpg'
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

  // const navigate = useNavigate()

  const handleLogout = () => {
    const { createConfirm } = messageBox()

    createConfirm({
      iconType: 'warning',
      title: <span>温馨提醒</span>,
      content: <span>是否确认退出系统?</span>,
      onOk: async () => {
        await logoutAction()
      },
    })
  }

  const logoutAction = async () => {
    // if (getToken()) {
    //   try {
    //     await logoutApi()
    //   } catch (error) {
    //     const { createMessage } = messageBox()
    //     createMessage.error('注销失败!')
    //   }
    // }
    // goLogin && navigate('/login')
  }

  return (
    <Dropdown menu={{ items, onClick }} placement='bottomRight' arrow>
      <span className='flex-center' style={{ cursor: 'pointer' }}>
        <img
          src={headerImg}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
          }}
          alt=''
        />
      </span>
    </Dropdown>
  )
}
