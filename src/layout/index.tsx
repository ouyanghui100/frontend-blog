import { Outlet, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import classNames from 'classnames'
import { useTitle } from '@/hooks/useTitle'
import { useMenuStore } from '@/store/menu'
import LayoutHeader from './header'
import LayoutMenu from './menu'
import './index.scss'

export const BasicLayout = () => {
  useTitle()
  const { Sider, Content } = Layout
  const location = useLocation()
  const { state } = location
  const { key = 'key' } = state || {}
  const { collapsed } = useMenuStore()
  const isImmersive = location.pathname === '/articles/new'

  return (
    <Layout
      className={classNames(
        'layout_wrapper flex h-[100vh] w-full overflow-x-hidden'
      )}
    >
      {!isImmersive && (
        <Sider width={210} trigger={null} collapsed={collapsed}>
          <LayoutMenu />
        </Sider>
      )}
      <Layout>
        <LayoutHeader />
        <Layout id="mainCont">
          <Content>
            <Outlet key={key} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
