import { Card } from 'antd'
import EmptyCard from '@/components/EmptyCard'
import { useECharts } from '@/hooks/useECharts'

interface propState {
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any
  height: number | string
}

const ChartsCard: React.FC<propState> = ({ loading, options, height }) => {
  const { chartRef } = useECharts(options, loading)

  const hasData = options?.series?.[0]?.data?.length > 0

  return hasData ? (
    <Card
      loading={loading}
      variant="borderless"
      className="h-full"
      styles={{
        body: {
          height: '100%',
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
