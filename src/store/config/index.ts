import { create } from 'zustand'
import { getTheme, setTheme, type ThemeType } from '@/utils/local'

interface configState {
  theme: ThemeType
}

interface configActions {
  setTheme: (theme?: 'light' | 'dark') => void
}

export const useConfigStore = create<configState & configActions>((set) => ({
  theme: (getTheme() || 'light') as ThemeType,
  setTheme: (value?: 'light' | 'dark') =>
    set((state) => {
      const newValue = value ?? (state.theme === 'light' ? 'dark' : 'light')
      setTheme(newValue) // 保持原有的副作用逻辑
      return { theme: newValue }
    }),
}))
