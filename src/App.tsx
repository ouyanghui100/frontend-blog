import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { HappyProvider } from '@ant-design/happy-work-theme'
// theme
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import router from '@/router'
// import { useConfigStore } from './store/config'

const App: React.FC = () => {
  // const { theme: themeStyle } = useConfigStore()
  // const { defaultAlgorithm, darkAlgorithm } = theme
  return (
    <ConfigProvider
      locale={zhCN}
      // theme={{
      //   algorithm: themeStyle === 'dark' ? darkAlgorithm : defaultAlgorithm,
      // }}
    >
      <HappyProvider>
        <RouterProvider router={router} />
      </HappyProvider>
    </ConfigProvider>
  )
}

export default App
