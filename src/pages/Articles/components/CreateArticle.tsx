import React from 'react'
import { useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { Button, Card, Form, Input, message, Select, Space } from 'antd'
import dayjs from 'dayjs'
import { frontedBlogApi } from '@/api'
import type { Category, Tag as TagType } from '@/api/frontedBlogApi'
import { PermissionButton } from '@/components/HOC/PermissionButton'
import { useUserStore } from '@/store/user'

type StatusType = 'draft' | 'published' | 'deleted'

const ArticleCreatePage: React.FC = () => {
  const { userInfo } = useUserStore()
  console.log('userInfo:', userInfo)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [saving, setSaving] = React.useState(false)
  const [content, setContent] = React.useState<string>('')

  const [tagOptions, setTagOptions] = React.useState<
    Array<{ label: string; value: number }>
  >([])
  const [categoryOptions, setCategoryOptions] = React.useState<
    Array<{ label: string; value: number }>
  >([])

  React.useEffect(() => {
    ;(async () => {
      try {
        const [tags, categories] = await Promise.all([
          frontedBlogApi.getTags(),
          frontedBlogApi.getCategories(),
        ])
        setTagOptions(
          (tags ?? []).map((t: TagType) => ({ label: t.name, value: t.id }))
        )
        setCategoryOptions(
          (categories ?? []).map((c: Category) => ({
            label: c.name,
            value: c.id,
          }))
        )
      } catch {
        // 统一拦截提示
      }
    })()
  }, [])

  const submit = React.useCallback(
    async (status: StatusType) => {
      try {
        const { title, summary, category, tags } = await form.validateFields()
        setSaving(true)
        await frontedBlogApi.createArticle({
          title: title,
          summary: summary,
          content: content || '',
          authorId: userInfo?.id as number,
          categoryId: category,
          tags: tags ?? [],
          status,
          publishedAt:
            status === 'published'
              ? dayjs().format('YYYY-MM-DD HH:mm:ss')
              : undefined,
        })
        message.success(status === 'published' ? '发布成功' : '草稿已保存')
        // 清空并返回列表
        form.resetFields()
        setContent('')
        navigate('/articles')
      } catch {
        // 校验失败或请求失败均交由拦截器/antd 处理
      } finally {
        setSaving(false)
      }
    },
    [content, form, navigate]
  )

  const onCancel = React.useCallback(() => {
    form.resetFields()
    setContent('')
    navigate('/articles')
  }, [form, navigate])

  return (
    <div className="h-full w-full">
      <Card
        variant="borderless"
        classNames={{ body: 'h-full' }}
        className="h-full"
      >
        <div className="flex h-full flex-col gap-3">
          <Form form={form} layout="inline" className="flex flex-wrap gap-3">
            <Form.Item
              name="title"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input placeholder="标题" className="w-80" allowClear />
            </Form.Item>
            <Form.Item
              name="summary"
              rules={[{ required: true, message: '请输入摘要' }]}
            >
              <Input.TextArea
                placeholder="摘要"
                className="w-96"
                allowClear
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
            <Form.Item
              name="category"
              rules={[{ required: true, message: '请选择分类' }]}
            >
              <Select
                placeholder="请选择分类"
                style={{ width: 224 }}
                allowClear
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={categoryOptions}
              />
            </Form.Item>
            <Form.Item
              name="tags"
              rules={[{ required: true, message: '请选择分类' }]}
            >
              <Select
                mode="tags"
                placeholder="请选择标签"
                style={{ width: 320 }}
                allowClear
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                tokenSeparators={[',', ' ']}
                options={tagOptions}
              />
            </Form.Item>
          </Form>

          <div className="min-h-0 flex-1" data-color-mode="light">
            <MDEditor
              value={content}
              onChange={(v) => setContent(v ?? '')}
              height={'100%'}
            />
          </div>

          <div className="sticky bottom-5 z-10 mt-2 text-right">
            <Space>
              <Button onClick={onCancel}>取消</Button>
              <PermissionButton
                loading={saving}
                variant="outlined"
                color="primary"
                onClick={() => submit('draft')}
              >
                存为草稿
              </PermissionButton>
              <PermissionButton
                color="primary"
                variant="solid"
                loading={saving}
                onClick={() => submit('published')}
              >
                发布
              </PermissionButton>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ArticleCreatePage
