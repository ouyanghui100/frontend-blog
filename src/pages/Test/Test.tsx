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
      <Header className="flex items-center">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          className="min-w-0 flex-1"
        />
      </Header>
      <Content className="px-48px">
        <Breadcrumb
          className="mb-16px"
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <div className="min-h-280px p-24px">Content</div>
      </Content>
      <Footer className="text-center">
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}
