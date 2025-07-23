import { Layout } from 'antd'
import Breadcrumb from './components/Breadcrumb'
import FoldTrigger from './components/FoldTrigger'
import UserDropdown from './components/UserDropdown'

const LayoutHeader = () => {
  const { Header } = Layout

  return (
    <Header className="flex h-auto flex-col justify-between bg-[#fff]">
      <div className="flex justify-between px-3 py-0">
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
