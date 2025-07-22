import loadable from '@loadable/component'
import { Spin } from 'antd'
import React from 'react'

const LazyLoad = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loader: () => Promise<{ default: React.ComponentType<any> }>
) =>
  loadable(loader, {
    fallback: (
      <Spin
        size="large"
        className="flex h-full items-center justify-center"
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
