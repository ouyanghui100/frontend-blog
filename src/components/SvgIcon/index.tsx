import React from 'react'

export interface SvgIconProp {
  name: string
  prefix?: string
  size?: number
  style?: React.CSSProperties
  className?: string
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void
  // title?: string
  // role?: string
  // tabIndex?: number
  // onKeyDown?: (event: React.KeyboardEvent<SVGSVGElement>) => void
}

export default function SvgIcon({
  name,
  prefix = 'icon',
  size = 16,
  style,
  className,
  onClick,
}: SvgIconProp) {
  const symbolId = `#${prefix}-${name}`
  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
    ...style,
  }

  return (
    <svg
      className={`inline-block overflow-hidden fill-current align-[-0.15em] ${className ? className : ''}`}
      style={iconStyle}
      aria-hidden="true"
      onClick={onClick}
    >
      <use href={symbolId} />
    </svg>
  )
}
