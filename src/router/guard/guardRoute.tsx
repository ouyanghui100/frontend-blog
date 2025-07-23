import { getToken } from '@/utils/local'
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const GuardRoute = ({ children }: { children: ReactNode }) => {
  const whiteList: string[] = ['/', '/login']
  const { pathname } = useLocation()

  if (!getToken()) {
    if (whiteList.includes(pathname)) {
      return <Navigate to="/login" replace />
    } else {
      return <Navigate to={`/login?redirect=${pathname}`} replace />
    }
  }

  return children
}
