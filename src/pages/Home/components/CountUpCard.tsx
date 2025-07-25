import type { FC } from 'react'
import { Card } from 'antd'
import CountUp from 'react-countup'
import SvgIcon from '@/components/SvgIcon'

interface propState {
  loading: boolean
  title: string
  color: string
  iconName: string
  countNum: number
}

const CountUpCard: FC<propState> = (props) => {
  return (
    <Card
      loading={props.loading}
      variant="borderless"
      styles={{ body: { padding: 0 } }}
    >
      <div className="flex items-center">
        <div
          className="rounded-tl-2 rounded-bl-2 flex h-[160px] w-[160px] items-center justify-center"
          style={{
            background: props.color,
          }}
        >
          <SvgIcon name={props.iconName} size={40} className="text-[#fff]" />
        </div>
        <div className="flex-1 text-center">
          <CountUp
            start={0}
            end={props.countNum}
            duration={3}
            className="text-[32px] text-[#515a6e]"
          />
          <p className="text-[16px]">{props.title}</p>
        </div>
      </div>
    </Card>
  )
}

export default CountUpCard
