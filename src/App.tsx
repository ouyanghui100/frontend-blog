import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { HappyProvider } from '@ant-design/happy-work-theme'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import router from '@/router'
// import ProgressBarHandler from './components/ProgressBarHandler'
// import nprogress from './utils/nprogress'
// import { useConfigStore } from './store/config'

const App: React.FC = () => {
  // const { theme: themeStyle } = useConfigStore()
  // const { defaultAlgorithm, darkAlgorithm } = theme
  // const navigation = useNavigation()

  // React.useEffect(() => {
  //   if (navigation.state === 'loading') {
  //     nprogress.start()
  //   } else {
  //     nprogress.done()
  //   }
  // }, [navigation.state])

  return (
    <ConfigProvider
      locale={zhCN}
      // theme={{
      //   algorithm: themeStyle === 'dark' ? darkAlgorithm : defaultAlgorithm,
      // }}
    >
      <HappyProvider>
        <RouterProvider
          router={router}
          // fallbackElement={<ProgressBarHandler />}
        />
      </HappyProvider>
    </ConfigProvider>
  )
}

export default App
