import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTitle as usePageTitle } from 'ahooks'
import { basicRoutes } from '@/router/index'
import { searchRoute } from '@/utils/searchRoute'

export function useTitle() {
  const [pageTitle, setPageTitle] = React.useState('博客后台管理')
  const { pathname } = useLocation()

  React.useEffect(() => {
    const currRoute = searchRoute(pathname, basicRoutes)
    setPageTitle(currRoute?.meta.title)
  }, [pathname])

  usePageTitle(pageTitle)
}
