// Token 相关操作
const TOKEN_KEY = 'access_token'
const THEME_KEY = 'theme'

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

export const getCollapsed = (): boolean => {
  return localStorage.getItem('collapsed') === 'true'
}

export const setCollapsed = (collapsed: boolean): void => {
  localStorage.setItem('collapsed', collapsed.toString())
}

export type ThemeType = 'dark' | 'light'
export const getTheme = (): string | null => {
  return localStorage.getItem(THEME_KEY)
}

export const setTheme = (theme: ThemeType): void => {
  localStorage.setItem(THEME_KEY, theme)
}
