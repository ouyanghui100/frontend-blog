import React from 'react'
import { Button, Card } from 'antd'
import SvgIcon from '@/components/SvgIcon'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error | null
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    console.error('UI ErrorBoundary caught an error:', error)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--ant-color-bg-layout)] p-4">
          <Card className="w-full max-w-xl shadow-xl">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ant-color-primary-bg)]">
                <SvgIcon
                  name="bug"
                  size={28}
                  className="text-[var(--ant-color-primary)]"
                />
              </div>
              <div>
                <div className="text-[22px] font-[700]">糟糕，页面出错了</div>
                <div className="mt-1 text-[var(--ant-color-text-secondary)]">
                  很抱歉给你带来不便，请尝试刷新页面或返回主页。
                </div>
              </div>
              {this.state.error?.message && (
                <div className="w-full rounded-md bg-[var(--ant-color-fill-tertiary)] p-3 text-left text-[13px] text-[var(--ant-color-text-secondary)]">
                  {this.state.error.message}
                </div>
              )}
              <div className="flex gap-2">
                <Button type="primary" onClick={this.handleReload}>
                  刷新页面
                </Button>
                <Button onClick={() => (window.location.href = '/')}>
                  返回首页
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
