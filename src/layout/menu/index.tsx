import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu, Spin } from 'antd'
import SvgIcon from '@/components/SvgIcon'
import { getAsyncMenus } from '@/router/menus'
import type { AppMenu } from '@/router/types'
import { useMenuStore } from '@/store/menu'
import { getOpenKeys } from '@/utils/helper'

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem
}

const LayoutMenu = () => {
  const { pathname } = useLocation()
  const setMenuListGlobal = useMenuStore((state) => state.setMenuList)
  const [loading, setLoading] = React.useState(false)
  const [menuList, setMenuList] = React.useState<MenuItem[]>([])
  const [openKeys, setOpenKeys] = React.useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([pathname])

  React.useEffect(() => {
    setSelectedKeys([pathname])
    setOpenKeys(getOpenKeys(pathname))
  }, [pathname])

  const addIcon = (icon?: string) => {
    if (!icon) return null
    return (
      <span>
        <SvgIcon name={icon} size={16} />
      </span>
    )
  }

  // #region 获取菜单
  const getMenuItem = (data: AppMenu[], list: MenuItem[] = []) => {
    data.forEach((item: AppMenu) => {
      if (!item?.children?.length) {
        return list.push(getItem(item.name, item.path, addIcon(item.icon)))
      }
      list.push(
        getItem(
          item.name,
          item.path,
          addIcon(item.icon),
          getMenuItem(item.children)
        )
      )
    })
    return list
  }
  const getMenuList = async () => {
    setLoading(true)
    try {
      const menus = await getAsyncMenus()
      setMenuList(getMenuItem(menus))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMenuListGlobal(menus as any)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getMenuList()
  }, [])
  // #endregion

  // #region 控制菜单
  const handleOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    if (keys.length === 0 || keys.length === 1) return setOpenKeys(keys)
    const latestKey = keys[keys.length - 1]
    if (latestKey.includes(keys[0])) return setOpenKeys(keys)
    setOpenKeys([latestKey])
  }

  const navigate = useNavigate()
  const handleMenuClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
    navigate(key)
  }
  // #endregion

  return (
    <div>
      <Spin spinning={loading} tip="Loading...">
        <Menu
          theme="dark"
          mode="inline"
          triggerSubMenuAction="click"
          inlineIndent={20}
          subMenuOpenDelay={0.2}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          items={menuList}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
        />
      </Spin>
    </div>
  )
}

export default LayoutMenu
