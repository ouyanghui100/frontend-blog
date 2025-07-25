import { Row, Col, Card } from 'antd'
import CountUpCard from './components/CountUpCard'
import React from 'react'
import ChartsCard from '@/components/ChartsCard'
import type { EChartsOption } from 'echarts'

export const countUpData = [
  {
    title: '文章数',
    icon: 'document',
    count: 682,
    color: '#1890ff',
  },
  {
    title: '评论数',
    icon: 'message',
    count: 259,
    color: '#fa541c',
  },
  {
    title: '访问次数',
    icon: 'person',
    count: 1262,
    color: '#faad14',
  },
  {
    title: '日志数',
    icon: 'location',
    count: 508,
    color: '#13c2c2',
  },
]

export const pieOptions: EChartsOption = {
  legend: {
    bottom: 0,
    data: ['推广渠道', '访问来源', '广告投放'],
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  series: [
    {
      name: '来源构成',
      type: 'pie',
      radius: ['40%', '70%'], // 环形饼图，去掉就是普通饼图
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        formatter: '{b}: {c}',
      },
      labelLine: {
        show: true,
      },
      data: [
        {
          value: 1920 + 1920 + 1920,
          name: '推广渠道',
          itemStyle: {
            color: '#1890ff',
          },
        },
        {
          value: 1920 + 0 + 0 + 1920 + 1920,
          name: '访问来源',
          itemStyle: {
            color: '#722ed1',
          },
        },
        {
          value: 920 * 5,
          name: '广告投放',
          itemStyle: {
            color: '#faad14',
          },
        },
      ],
    },
  ],
}

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 1500)

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <Row gutter={12}>
        {countUpData.map((item) => (
          <Col flex={1} key={item.title}>
            <CountUpCard
              loading={isLoading}
              title={item.title}
              color={item.color}
              iconName={item.icon}
              countNum={item.count}
            />
          </Col>
        ))}
      </Row>
      <div className="flex-1">
        <Row gutter={12} style={{ height: '100%' }}>
          <Col span={12}>
            <ChartsCard
              loading={isLoading}
              options={pieOptions}
              height="100%"
            />
          </Col>
          <Col span={6}>
            <Card
              className="h-full"
              styles={{
                body: {
                  height: '100%',
                },
              }}
            >
              <p className="text-[20px] font-[600]">分类</p>
            </Card>
          </Col>
          <Col span={6}>3333333333333</Col>
        </Row>
      </div>
    </div>
  )
}

export default HomePage
