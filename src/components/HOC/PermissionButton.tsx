// PermissionButton.tsx
import React from 'react'
import { Button, type ButtonProps, message } from 'antd'

interface PermissionButtonProps extends ButtonProps {
  tooltipWhenDenied?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  role?: Role
}

export type Role = 'admin' | 'guest'
export function getPermission(role?: Role) {
  // 这里可以根据更复杂的策略映射
  const can = (() => {
    if (role === 'admin') return true
    if (role === 'guest') return false
    return true
  })()

  return { can }
}

export const PermissionButton: React.FC<PermissionButtonProps> = ({
  tooltipWhenDenied,
  children,
  onClick,
  role,
  ...rest
}) => {
  const { can } = getPermission(role)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!can) {
      e.preventDefault()
      e.stopPropagation()
      message.error(tooltipWhenDenied || '你没有操作权限')
      return
    }
    onClick?.(e)
  }

  return (
    <Button {...rest} onClick={handleClick}>
      {children}
    </Button>
  )
}
