import { create } from 'zustand'
import { getCollapsed, setCollapsed } from '@/utils/local'

export const useMenuStore = create<any>((set, get) => ({
  collapsed: getCollapsed() || false,
  setCollapsed: () =>
    set((state: any) => {
      const newValue = !state.collapsed
      setCollapsed(newValue)
      return { collapsed: newValue }
    }),
}))
