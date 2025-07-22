import { Layout } from 'antd'
import Breadcrumb from './components/Breadcrumb'
import FoldTrigger from './components/FoldTrigger'
import UserDropdown from './components/UserDropdown'

const LayoutHeader = () => {
  const { Header } = Layout

  return (
    <Header className="bg-hex-fff flex h-auto flex-col justify-between">
      <div className="px-12px flex justify-between py-0">
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
