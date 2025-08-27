import { lazy } from '@loadable/component'
import LazyLoad from '@/components/LazyLoad'
import { LayoutGuard } from '../guard'
import type { RouteObject } from '../types'

// Home route
const TagsRoute: RouteObject = {
  path: '/categories',
  name: 'Categories',
  element: <LayoutGuard />,
  meta: {
    title: '分类',
    icon: 'categories',
    affix: true,
    orderNo: 3,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'CategoriesPage',
      element: LazyLoad(lazy(() => import('@/pages/Categories/index'))),
      meta: {
        title: '分类',
        key: 'categories',
        icon: 'categories',
        orderNo: 3,
        hideMenu: true,
      },
    },
  ],
}

export default TagsRoute
