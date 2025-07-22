import { create } from 'zustand'
import { getCollapsed, setCollapsed } from '@/utils/local'

interface MenuState {
  collapsed: boolean
}
interface MenuActions {
  setCollapsed: () => void
}

export const useMenuStore = create<MenuState & MenuActions>((set) => ({
  collapsed: getCollapsed() || false,
  setCollapsed: () =>
    set((state: any) => {
      const newValue = !state.collapsed
      setCollapsed(newValue)
      return { collapsed: newValue }
    }),
}))
