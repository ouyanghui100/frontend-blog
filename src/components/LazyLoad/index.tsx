import loadable from '@loadable/component'
import { Spin } from 'antd'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LazyLoad = (
  loader: () => Promise<{ default: React.ComponentType<any> }>
) =>
  loadable(loader, {
    fallback: (
      <Spin size="large" className="flex h-full items-center justify-center" />
    ),
  })

export default LazyLoad
