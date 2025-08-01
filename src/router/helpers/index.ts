import { cloneDeep } from 'lodash-es'
import { isUrl } from '@/utils/is'
import type { AppMenu, RouteObject } from '../types'

export function joinParentPath(menus: AppMenu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // Note that nested paths that start with / will be treated as a root path.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // Path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  }
}

export function genFullPath(routes: RouteObject[], parentPath = '') {
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index]

    if (route.path!.startsWith('/')) {
      route.fullPath = route.path
    } else {
      route.fullPath = `${parentPath}/${route.path}`
    }

    if (route?.children?.length) {
      genFullPath(route.children, route.fullPath)
    }
  }
}

export function transformRouteToMenu(routes: RouteObject[]) {
  const cloneRoutes = cloneDeep(routes)
  const routeList: RouteObject[] = []

  cloneRoutes.forEach((item) => {
    if (item.meta!.hideChildrenInMenu) {
      item.children = []
    }

    routeList.push(item)
  })

  const list = treeMap(routeList, {
    conversion: (node: RouteObject) => {
      const { meta: { title, hideMenu = false, ...rest } = {} } = node

      return {
        ...(rest || {}),
        name: title,
        hideMenu,
        path: node.path,
      }
    },
  }) as AppMenu[]

  joinParentPath(list)
  return cloneDeep(list)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function treeMap<T = any>(
  treeData: T[],
  opt: { children?: string; conversion: Fn }
): T[] {
  return treeData.map((item) => treeMapEach(item, opt))
}

/**
 * @description: Extract tree specified structure
 */
export function treeMapEach(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren =
    Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) =>
        treeMapEach(i, {
          children,
          conversion,
        })
      ),
    }
  } else {
    return {
      ...conversionData,
    }
  }
}
