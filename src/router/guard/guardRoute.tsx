import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '@/utils/local'

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
