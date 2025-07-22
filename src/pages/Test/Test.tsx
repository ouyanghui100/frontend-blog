import React from 'react'
import { Breadcrumb, Layout, Menu } from 'antd'
import { frontedBlogApi } from '@/api'
import { useUserStore } from '@/store/user'
const { Header, Content, Footer } = Layout

const items = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}))

export const Test: React.FC = () => {
  const { adminLogin } = useUserStore((state) => state)
  React.useEffect(() => {
    frontedBlogApi.getTags().then((res) => {
      console.log(res)
    })
    adminLogin({ username: 'ouyanghui', password: 'keep2902897795' })
  }, [])
  return (
    <Layout className="h-full w-full">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <div
          style={{
            // background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            // borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}
