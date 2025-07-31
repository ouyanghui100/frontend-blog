import React from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19'
import App from './App.tsx'
import '@/design/index.scss'
import './index.css'
// register svg icon
import 'virtual:svg-icons-register'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
