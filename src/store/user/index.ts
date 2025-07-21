import { create } from 'zustand'
import { frontedBlogApi } from '@/api'
import { getToken, setToken as saveToken, removeToken } from '@/utils/local'
import type { User } from '@/api/frontedBlogApi'

interface UserState {
  token: string
  userInfo: User | null
  setToken: (token: string) => void
  setUserInfo: (user: User | null) => void
  adminLogin: (params: { username: string; password: string }) => Promise<void>
  guestAccess: () => Promise<void>
  logout: () => void
  getProfile: () => Promise<User | null>
}

export const useUserStore = create<UserState>((set, get) => ({
  token: getToken() || '',
  userInfo: null,
  setToken: token => {
    saveToken(token)
    set({ token })
  },
  setUserInfo: user => {
    set({ userInfo: user })
  },
  adminLogin: async (params: { username: string; password: string }) => {
    const res = await frontedBlogApi.adminLogin(params)
    if (res.accessToken) {
      saveToken(res.accessToken)
      set({ token: res.accessToken })
    } else {
      throw new Error('接口未返回 accessToken')
    }
  },
  guestAccess: async () => {
    const res = await frontedBlogApi.guestAccess()
    if (res.accessToken) {
      saveToken(res.accessToken)
      set({ token: res.accessToken })
    }
  },
  logout: () => {
    removeToken()
    set({ token: '', userInfo: null })
  },
  getProfile: async () => {
    try {
      const res = await frontedBlogApi.getProfile()
      set({ userInfo: res })
      return res
    } catch (e) {
      set({ userInfo: null })
      return null
    }
  },
}))
