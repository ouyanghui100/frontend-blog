import { create } from 'zustand'
import { getCollapsed, setCollapsed } from '@/utils/local'

export interface MenuOptions {
  path: string
  title: string
  icon?: string
  isLink?: string
  close?: boolean
  children?: MenuOptions[]
}
interface MenuState {
  collapsed: boolean
  menuList: MenuOptions[]
}
interface MenuActions {
  setCollapsed: () => void
  setMenuList: (menuList: MenuState['menuList']) => void
}

export const useMenuStore = create<MenuState & MenuActions>((set) => ({
  collapsed: getCollapsed() || false,
  menuList: [],
  setMenuList: (menuList) => {
    console.log('44444444444444444444', menuList)
    set({ menuList })
  },
  setCollapsed: () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set((state: any) => {
      const newValue = !state.collapsed
      setCollapsed(newValue)
      return { collapsed: newValue }
    }),
}))
