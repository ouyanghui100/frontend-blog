import { type FC } from 'react'
import { Row, Col, Space } from 'antd'
import CountUpCard from './components/CountUpCard'
import React from 'react'

export const countUpData = [
  {
    title: '文章数',
    icon: 'location',
    count: 682,
    color: '#1890ff',
  },
  {
    title: '评论数',
    icon: 'person',
    count: 259,
    color: '#fa541c',
  },
  {
    title: '访问次数',
    icon: 'message',
    count: 1262,
    color: '#faad14',
  },
  {
    title: '日志数',
    icon: 'like',
    count: 508,
    color: '#13c2c2',
  },
]

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = React.useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 1500)

  return (
    <Space direction="vertical" size={12} style={{ display: 'flex' }}>
      <Row gutter={12}>
        {countUpData.map((item) => {
          return (
            <Col flex={1} key={item.title}>
              <CountUpCard
                loading={isLoading}
                title={item.title}
                color={item.color}
                iconName={item.icon}
                countNum={item.count}
              />
            </Col>
          )
        })}
      </Row>
      <Row gutter={12}>
        <Col span={8}>111111111</Col>
        <Col span={8}>222222222222</Col>
        <Col span={8}>3333333333333</Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>444444</Col>
        <Col span={12}>555555555555555555</Col>
      </Row>
    </Space>
  )
}

export default HomePage
