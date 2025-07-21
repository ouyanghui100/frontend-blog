// Token 相关操作
const TOKEN_KEY = 'access_token'

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

// 用户信息相关操作
const USER_INFO_KEY = 'user_info'

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_INFO_KEY)
  return userInfo ? JSON.parse(userInfo) : null
}

export const setUserInfo = (userInfo: any): void => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

export const removeUserInfo = (): void => {
  localStorage.removeItem(USER_INFO_KEY)
}

// 清除所有本地存储
export const clearLocalStorage = (): void => {
  localStorage.clear()
}
