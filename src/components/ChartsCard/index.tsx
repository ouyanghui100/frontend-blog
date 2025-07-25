import { type FC } from 'react'
import { Card } from 'antd'
import EmptyCard from '@/components/EmptyCard'
import { useECharts } from '@/hooks/useECharts'

interface propState {
  loading: boolean
  options: any
  height: number | string
}

const ChartsCard: FC<propState> = ({ loading, options, height }) => {
  const { chartRef } = useECharts(options, loading)

  const hasData = options?.series?.[0]?.data?.length > 0

  return hasData ? (
    <Card
      loading={loading}
      variant="borderless"
      style={{ height: '100%' }}
      styles={{
        body: {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        },
      }}
    >
      <div ref={chartRef} style={{ width: '100%', height }} />
    </Card>
  ) : (
    <EmptyCard style={{ width: '100%', height }} loading={loading} />
  )
}

export default ChartsCard
