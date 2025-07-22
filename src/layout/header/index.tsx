import { Layout } from 'antd'
import Breadcrumb from './components/Breadcrumb'
import FoldTrigger from './components/FoldTrigger'
import UserDropdown from './components/UserDropdown'

const LayoutHeader = () => {
  const { Header } = Layout

  return (
    <Header
      className="flex-between-h"
      style={{
        flexDirection: 'column',
        height: 'auto',
        background: '#fff',
      }}
    >
      <div className="flex-between-h" style={{ padding: '0 12px' }}>
        <div className="flex items-center">
          <FoldTrigger />
          <Breadcrumb />
        </div>
        <UserDropdown />
      </div>
    </Header>
  )
}

export default LayoutHeader
