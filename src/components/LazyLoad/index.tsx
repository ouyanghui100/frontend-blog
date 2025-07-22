import loadable from '@loadable/component'
import { Spin } from 'antd'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LazyLoad = (
  loader: () => Promise<{ default: React.ComponentType<any> }>
) =>
  loadable(loader, {
    fallback: (
      <Spin
        size="large"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      />
    ),
  })

export default LazyLoad
