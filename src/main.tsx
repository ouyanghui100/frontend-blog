import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@/design/index.scss'
import '@ant-design/v5-patch-for-react-19'

// register svg icon
import 'virtual:svg-icons-register'
import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
