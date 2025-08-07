import { Layout } from 'antd'
import classNames from 'classnames'
import SvgIcon from '@/components/SvgIcon'
import { useConfigStore } from '@/store/config'
import Breadcrumb from './components/Breadcrumb'
import FoldTrigger from './components/FoldTrigger'
import UserDropdown from './components/UserDropdown'

const LayoutHeader = () => {
  const { Header } = Layout
  const { theme, setTheme } = useConfigStore()

  return (
    <Header
      className={classNames('flex h-[48px] flex-col justify-between', {
        '!bg-[#fff]': theme === 'light',
        '!bg-[#001529]': theme === 'dark',
      })}
    >
      <div className="flex h-full w-full items-center justify-between px-3 py-0">
        <div className="flex items-center">
          <FoldTrigger />
          <Breadcrumb />
        </div>
        <div className="flex items-center gap-2">
          {theme === 'light' ? (
            <SvgIcon
              name="dayTime"
              size={20}
              onClick={() => setTheme('dark')}
            />
          ) : (
            <SvgIcon
              name="blackSky"
              size={20}
              onClick={() => setTheme('light')}
            />
          )}

          <UserDropdown />
        </div>
      </div>
    </Header>
  )
}

export default LayoutHeader
