import { create } from 'zustand'
import { getTheme, setTheme, type ThemeType } from '@/utils/local'

interface configState {
  theme: ThemeType
}

export const useConfigStore = create<configState>((set) => ({
  theme: (getTheme() || 'light') as ThemeType,
  setTheme: () =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set((state: any) => {
      const newValue = state.theme === 'light' ? 'dark' : 'light'
      setTheme(newValue)
      return { theme: newValue }
    }),
}))
