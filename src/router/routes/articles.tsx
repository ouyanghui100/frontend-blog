import { lazy } from '@loadable/component'
import LazyLoad from '@/components/LazyLoad'
import { LayoutGuard } from '../guard'
import type { RouteObject } from '../types'

const ArticlesRoute: RouteObject = {
  path: '/articles',
  name: 'Articles',
  element: <LayoutGuard />,
  meta: {
    title: '文章',
    icon: 'articles',
    affix: true,
    orderNo: 4,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      name: 'ArticlesPage',
      element: LazyLoad(lazy(() => import('@/pages/Articles/'))),
      meta: {
        title: '文章',
        key: 'articles',
        icon: 'articles',
        orderNo: 4,
        hideMenu: true,
      },
    },
  ],
}

export default ArticlesRoute
