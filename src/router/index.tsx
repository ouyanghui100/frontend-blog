import { createHashRouter, Navigate, redirect } from 'react-router-dom'
import PageException from '@/pages/Exception'
import LoginPage from '@/pages/Login'
import { getToken } from '@/utils/local'
import NprogressProvider from './nprogressProvider/index'
import { genFullPath } from './helpers'
import type { RouteObject } from './types'

const metaRoutes = import.meta.glob('./routes/*.tsx', {
  eager: true,
}) as Recordable

const routeList: RouteObject[] = []

Object.keys(metaRoutes).forEach((key) => {
  const module = metaRoutes[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  genFullPath(moduleList)
  routeList.push(...moduleList)
})

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <NprogressProvider />,
    // ToFix: 这样多了一层，看起来不优雅，后面找找看有没有更好的解法
    children: [
      {
        path: '/',
        name: 'Root',
        element: <Navigate to="/home" />,
      },
      {
        path: '/login',
        name: 'Login',
        element: <LoginPage />,
        meta: {
          title: '登录页',
          key: 'login',
        },
        loader: () => {
          if (getToken()) {
            return redirect('/')
          }
          return null
        },
      },
      ...routeList,
      // 这样404是两层，会造成“回不去”的现象
      {
        path: '*',
        name: 'RedirectTo',
        element: <Navigate to="/404" />,
      },
      {
        path: '/404',
        name: 'PageNotFound',
        element: <PageException />,
        loader: () => ({ status: 404, withCard: false }),
      },
    ],
  },
]

export { routeList as basicRoutes }

export default createHashRouter(rootRoutes)
