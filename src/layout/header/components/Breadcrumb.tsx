import { Breadcrumb } from 'antd'
import { useLocation, matchRoutes } from 'react-router-dom'

import SvgIcon from '@/components/SvgIcon'
import React from 'react'

export default function LayoutBreadcrumb() {
  const [breadcrumbs, setBreadcrumbs] = React.useState<any[]>([])
  const { pathname } = useLocation()
  const getMenuList: any[] = []

  React.useEffect(() => {
    const matchRouteList = matchRoutes(getMenuList, pathname) || []
    const breadcrumbList = matchRouteList.map((item: any) => {
      const { name, icon = '' } = item?.route
      return {
        title: (
          <>
            {icon && <SvgIcon name={icon} style={{ marginRight: 8 }} />}
            <span>{name}</span>
          </>
        ),
      }
    })
    setBreadcrumbs(breadcrumbList)
  }, [pathname])

  return (
    <div className='flex-center-v' style={{ padding: '0 16px' }}>
      <Breadcrumb items={breadcrumbs} />
    </div>
  )
}
