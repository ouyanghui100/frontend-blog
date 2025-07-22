import SvgIcon from '@/components/SvgIcon'
import classNames from 'classnames'
import { useMenuStore } from '@/store/menu'

export default function FoldTrigger() {
  const { collapsed, setCollapsed } = useMenuStore()
  return (
    <span
      className={classNames('flex items-center cursor-pointer', { unfold: !collapsed })}
      onClick={setCollapsed}
    >
      <SvgIcon
        name='unfold'
        size={20}
        className={classNames('transition-transform', { '-scale-x-100': !collapsed })}
      />
    </span>
  )
}
