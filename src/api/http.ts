import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { message } from 'antd'
import { get, merge } from 'lodash-es'
import { getToken } from '@/utils/local'
import { API_CONFIG } from '@/config'

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  method?: string
  params?: any
  data?: any
  url?: string
}

const createUrl = (path = '', obj = {}) => {
  return path.replace(/\{([^}]+)\}/g, (_$0, $1) => (obj && obj[$1 as keyof typeof obj]) ?? '')
}

const noMessageCodeList: number[] = [
  // 错误码
]

/** 创建请求实例 */
function createService() {
  const service = axios.create()
  service.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
      if (config.method === 'get') {
        if (!config.params) {
          config.params = {}
        }
        config.url = createUrl(config.url, config.params)
      } else {
        if (!config.data) {
          config.data = {}
        }
        config.url = createUrl(config.url, config.data)
      }
      return config
    },
    (error: any) => Promise.reject(error)
  )
  service.interceptors.response.use(
    (response: AxiosResponse & { config: CustomAxiosRequestConfig }) => {
      // response.config.loading && tryHideFullScreenLoading()
      const apiData = response.data
      const responseType = response.request?.responseType
      if (responseType === 'blob' || responseType === 'arraybuffer') {
        const contentDisposition = response.headers['content-disposition']
        let resFileName
        if (contentDisposition) {
          resFileName = contentDisposition.split('=')[1] || ''
          try {
            resFileName = JSON.parse(resFileName)
          } catch (ex) {
            // ignore
          }
          resFileName = decodeURIComponent(resFileName)
        }
        return {
          blob: apiData as Blob,
          filename: resFileName as string,
        }
      }
      const code = apiData.code
      if (code === undefined) {
        message.error('非本系统的接口')
        return Promise.reject(new Error('非本系统的接口'))
      }
      switch (code) {
        case 200:
          return apiData.data
        case 401:
          // Token 过期时，登出逻辑可在此补充
          // TODO: 处理登出逻辑
          return Promise.reject(apiData)
        default:
          !noMessageCodeList.includes(code) && message.error(apiData.message || 'Error')
          return Promise.reject(apiData)
      }
    },
    (error: any) => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          // Token 过期时，登出逻辑可在此补充
          // TODO: 处理登出逻辑
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求地址出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP 版本不受支持'
          break
        default:
          break
      }
      message.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createHttp(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const token = getToken()
    const defaultConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json',
      },
      timeout: config?.timeout ?? API_CONFIG.timeout,
      baseURL: API_CONFIG.baseURL,
      data: {},
    }
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

const service = createService()
export const http = createHttp(service)
