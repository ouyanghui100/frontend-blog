import { Outlet, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import { useTitle } from '@/hooks/useTitle'
import { useMenuStore } from '@/store/menu'
import LayoutHeader from './header'
import LayoutMenu from './menu'
import './index.scss'

export const BasicLayout = () => {
  useTitle()
  const { Sider, Content } = Layout
  const { state } = useLocation()
  const { key = 'key' } = state || {}
  const { collapsed } = useMenuStore()

  return (
    <Layout className="layout_wrapper flex h-[100vh] w-full overflow-x-hidden">
      <Sider
        width={210}
        trigger={null}
        collapsed={collapsed}
        className="h-[100vh]"
      >
        <LayoutMenu />
      </Sider>
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
