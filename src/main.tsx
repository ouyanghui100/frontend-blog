import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/design/index.scss'
import './index.css'
import '@ant-design/v5-patch-for-react-19'
// register svg icon
import 'virtual:svg-icons-register'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
