import { lazy } from '@loadable/component'
import LazyLoad from '@/components/LazyLoad'
import { LayoutGuard } from '../guard'
import type { RouteObject } from '../types'

// Home route
const HomeRoute: RouteObject = {
  path: '/home',
  name: 'Home',
  element: <LayoutGuard />,
  meta: {
    title: '首页',
    icon: 'home',
    affix: true,
    orderNo: 1,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'HomePage',
      element: LazyLoad(lazy(() => import('@/pages/Home'))),
      meta: {
        title: '首页',
        key: 'home',
        icon: 'home',
        orderNo: 1,
        hideMenu: true,
      },
    },
  ],
}

export default HomeRoute
