import type { FC, ReactNode } from 'react'
import { Result, Card, Button } from 'antd'
import { useNavigate, useLoaderData } from 'react-router-dom'
import PageWrapper from '@/components/Page'
import { RESULT_COMPO } from '@/settings/websiteSetting'
import { ExceptionEnum } from '@/api'

const subTitleMap = new Map([
  [ExceptionEnum.PAGE_NOT_ACCESS, '对不起，您没有权限访问此页面。'],
  [ExceptionEnum.PAGE_NOT_FOUND, '对不起，您访问的页面不存在。'],
  [ExceptionEnum.SERVER_ERROR, '对不起，服务器发生错误。'],
])

const PageException: FC = () => {
  const navigate = useNavigate()

  const { status, withCard } = useLoaderData() as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    status: any
    withCard: boolean
  }

  const goHome = () => {
    navigate('/home')
  }

  const WithCard = ({ children }: { children: ReactNode }) => {
    if (withCard) {
      return (
        <PageWrapper plugin={RESULT_COMPO}>
          <Card bordered={false}>{children}</Card>
        </PageWrapper>
      )
    } else {
      return (
        <div className="flex h-full w-full items-center justify-center">
          {children}
        </div>
      )
    }
  }

  return (
    <WithCard>
      <Result
        status={status}
        title={status}
        subTitle={subTitleMap.get(status)}
        extra={
          <Button type="primary" onClick={goHome}>
            返回首页
          </Button>
        }
      />
    </WithCard>
  )
}

export default PageException
