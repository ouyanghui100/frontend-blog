import { Breadcrumb } from 'antd'
import { useLocation, matchRoutes } from 'react-router-dom'

import SvgIcon from '@/components/SvgIcon'
import React from 'react'

export default function LayoutBreadcrumb() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [breadcrumbs, setBreadcrumbs] = React.useState<any[]>([])
  const { pathname } = useLocation()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMenuList: any[] = []

  React.useEffect(() => {
    const matchRouteList = matchRoutes(getMenuList, pathname) || []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const breadcrumbList = matchRouteList.map((item: any) => {
      const { name, icon = '' } = item?.route
      return {
        title: (
          <>
            {icon && <SvgIcon name={icon} className="mr-2" />}
            <span>{name}</span>
          </>
        ),
      }
    })
    setBreadcrumbs(breadcrumbList)
  }, [pathname])

  return (
    <div className="flex items-center px-4">
      <Breadcrumb items={breadcrumbs} />
    </div>
  )
}
