
import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));
export const Test:React.FC = () => {
  return (
    <Layout className="w-full h-full">
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