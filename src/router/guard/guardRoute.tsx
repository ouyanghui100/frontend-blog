import type { ReactNode } from 'react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '@/utils/local'
import nprogress from '@/utils/nprogress'

export const GuardRoute = ({ children }: { children: ReactNode }) => {
  const whiteList: string[] = ['/', '/login']
  const { pathname } = useLocation()

  // #region 加载条
  React.useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [pathname])
  // #endregion

  if (!getToken()) {
    if (whiteList.includes(pathname)) {
      return <Navigate to="/login" replace />
    } else {
      return <Navigate to={`/login?redirect=${pathname}`} replace />
    }
  }

  return children
}
