import { Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import LayoutMenu from './menu'
import LayoutHeader from './header'
// import { AppLogo } from '@/components/AppLogo'
import './index.less'
import { useTitle } from '@/hooks/useTitle'
// import { useAppSelector } from '@/stores'
import { useMenuStore } from '@/store/menu'

export const BasicLayout = () => {
  useTitle()
  const { Sider, Content } = Layout
  const { state } = useLocation()
  const { key = 'key' } = state || {}
  const { collapsed } = useMenuStore()

  return (
    <Layout className='flex w-full h-100vh overflow-x-hidden'>
      <Sider width={210} trigger={null} collapsed={collapsed} style={{ height: '100vh' }}>
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Layout id='mainCont'>
          <Content>
            <Outlet key={key} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
