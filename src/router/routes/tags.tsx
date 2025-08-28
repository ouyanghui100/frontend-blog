import { lazy } from '@loadable/component'
import LazyLoad from '@/components/LazyLoad'
import { LayoutGuard } from '../guard'
import type { RouteObject } from '../types'

const TagsRoute: RouteObject = {
  path: '/tags',
  name: 'Tags',
  element: <LayoutGuard />,
  meta: {
    title: '标签',
    icon: 'tags',
    affix: true,
    orderNo: 2,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'TagsPage',
      element: LazyLoad(lazy(() => import('@/pages/Tags'))),
      meta: {
        title: '标签',
        key: 'tags',
        icon: 'tags',
        orderNo: 2,
        hideMenu: true,
      },
    },
  ],
}

export default TagsRoute
