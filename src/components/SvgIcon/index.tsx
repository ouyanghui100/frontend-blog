import React from 'react'

export interface SvgIconProp {
  name: string
  prefix?: string
  size?: number
  style?: React.CSSProperties
  className?: string
}

export default function SvgIcon({
  name,
  prefix = 'icon',
  size = 16,
  style,
  className,
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
    >
      <use href={symbolId} />
    </svg>
  )
}
