import { lazy } from '@loadable/component'
import LazyLoad from '@/components/LazyLoad'
import { LayoutGuard } from '../guard'
import type { RouteObject } from '../types'

const LogsRoute: RouteObject = {
  path: '/logs',
  name: 'Logs',
  element: <LayoutGuard />,
  meta: {
    title: '日志',
    icon: 'location',
    affix: true,
    orderNo: 5,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'LogsPage',
      element: LazyLoad(lazy(() => import('@/pages/Logs/'))),
      meta: {
        title: '文章',
        key: 'logs',
        icon: 'location',
        orderNo: 5,
        hideMenu: true,
      },
    },
  ],
}

export default LogsRoute
