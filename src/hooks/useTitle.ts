import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTitle as usePageTitle } from 'ahooks'
import { searchRoute } from '@/utils/searchRoute'
import { basicRoutes } from '@/router/index'
export function useTitle() {
  const [pageTitle, setPageTitle] = useState('react-admin-design')
  const { pathname } = useLocation()

  useEffect(() => {
    const currRoute = searchRoute(pathname, basicRoutes)
    setPageTitle(currRoute?.meta.title)
  }, [pathname])

  usePageTitle(pageTitle)
}
