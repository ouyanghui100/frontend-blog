import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import nprogress from '@/utils/nprogress'

const NprogressProvider: React.FC = () => {
  const location = useLocation()

  React.useEffect(() => {
    nprogress.done()
    return () => nprogress.start()
  }, [location.pathname])

  return <Outlet />
}

export default NprogressProvider
