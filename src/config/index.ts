// API 配置
export const API_CONFIG = {
  // 从环境变量获取 baseURL，如果没有则使用默认值
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  // 请求头配置
  headers: {
    'Content-Type': 'application/json',
  },
}

// 应用配置
export const APP_CONFIG = {
  name: 'Frontend Blog',
  version: '1.0.0',
  // 其他应用配置
}

// 开发环境配置
export const DEV_CONFIG = {
  // 是否开启调试模式
  debug: import.meta.env.DEV,
  // 是否开启 mock 数据
  mock: import.meta.env.VITE_USE_MOCK === 'true',
}
