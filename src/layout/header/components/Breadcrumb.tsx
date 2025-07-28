import { Breadcrumb } from 'antd'
import { useLocation, matchRoutes } from 'react-router-dom'
import SvgIcon from '@/components/SvgIcon'
import React from 'react'
import { useMenuStore } from '@/store/menu'

export default function LayoutBreadcrumb() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [breadcrumbs, setBreadcrumbs] = React.useState<any[]>([])
  const { pathname } = useLocation()
  const menuList = useMenuStore((state) => state.menuList)

  React.useEffect(() => {
    const matchRouteList = matchRoutes(menuList, pathname) || []
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
  }, [pathname, menuList])

  return (
    <div className="flex items-center px-4">
      <Breadcrumb items={breadcrumbs} />
    </div>
  )
}
