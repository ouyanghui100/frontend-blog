import { Button } from 'antd'
import { openWindow } from '@/utils/index'
import SvgIcon from '@/components/SvgIcon'
import type { JSX } from 'react'

interface PluginProp {
  name?: string
  desc?: string
  url?: string
}

interface PageProp {
  plugin: PluginProp
  children: JSX.Element
}

const PageWrapper = (props: PageProp) => {
  function openGithub() {
    openWindow(props.plugin?.url!)
  }

  return (
    <div className="h-full">
      <div className="min-h-48px bg-hex-fff box-sizing-border mb-3 w-full px-6 py-4">
        <div className="text-16px font-600 mb-1">
          <SvgIcon name="hints" size={18} />
          <span>{props.plugin?.name}</span>
        </div>
        <p>{props.plugin?.desc}</p>
        <p>
          <span>github源码:</span>
          <Button type="link" size="small" onClick={openGithub}>
            立即访问
          </Button>
        </p>
      </div>
      <div className="min-h-420px">{props.children}</div>
    </div>
  )
}

export default PageWrapper
