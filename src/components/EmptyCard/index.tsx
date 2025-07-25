import type { FC } from 'react'
import noData from '@/assets/images/no-data.png'
import { Card } from 'antd'

interface propState {
  wordData?: string
  style?: React.CSSProperties
  loading: boolean
}

const EmptyCard: FC<propState> = ({ wordData, style, loading }) => {
  console.log(wordData)
  return (
    <Card variant="borderless" loading={loading} style={style}>
      <div className="flex items-center justify-center px-8 py-12">
        <div className="flex flex-col items-center justify-center">
          <img src={noData} width="170" alt="暂无数据" />
          <span className="text-[#999]">{wordData || '暂无数据'}</span>
        </div>
      </div>
    </Card>
  )
}

export default EmptyCard
