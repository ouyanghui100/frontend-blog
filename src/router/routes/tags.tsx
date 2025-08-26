import { lazy } from '@loadable/component'
import LazyLoad from '@/components/LazyLoad'
import { LayoutGuard } from '../guard'
import type { RouteObject } from '../types'

// Home route
const TagsRoute: RouteObject = {
  path: '/tags',
  name: 'Tags',
  element: <LayoutGuard />,
  meta: {
    title: '标签',
    icon: 'home',
    affix: true,
    orderNo: 1,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'TagsPage',
      element: LazyLoad(lazy(() => import('@/pages/Tags/index'))),
      meta: {
        title: '标签',
        key: 'tags',
        icon: 'home',
        orderNo: 1,
        hideMenu: true,
      },
    },
  ],
}

export default TagsRoute
