import { type ReactNode, Suspense } from 'react'
import type { LoadableComponent } from '@loadable/component'
import { Spin } from 'antd'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LazyLoad = (Component: LoadableComponent<any>): ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        />
      }
    >
      <Component />
    </Suspense>
  )
}

export default LazyLoad
