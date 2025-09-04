import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  type TableProps,
  Tag,
} from 'antd'
import dayjs from 'dayjs'
import { frontedBlogApi } from '@/api'
import { StatusTypeEnum } from '@/api/enums'
import { TAG_COLOR_LIST } from '@/api/enums'
import type {
  Category as CategoryType,
  Tag as TagType,
} from '@/api/frontedBlogApi'
import { PermissionButton } from '@/components/HOC/PermissionButton'

type StatusType = 'draft' | 'published' | 'deleted'
interface DataType {
  key: string
  title: string
  summary: string
  author: string
  category: string
  tags: string[]
  // 是否主动推荐
  isRecommend: boolean
  // 是否推荐
  isFeatured: boolean
  status: StatusType
  createdAt: string
  updatedAt?: string | null
  publishedAt?: string | null
}

const ArticlesPage = () => {
  const navigate = useNavigate()
  // #region 表单结构
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      key: 'summary',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag, idx) => {
            const color = TAG_COLOR_LIST[idx % TAG_COLOR_LIST.length]
            return (
              <Tag color={color} key={`${tag}-${idx}`}>
                {tag}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: '主动推荐',
      dataIndex: 'isRecommend',
      key: 'isRecommend',
      render: (isRecommend: boolean, record) => (
        <Switch
          checked={!!isRecommend}
          onChange={async (checked) => {
            // 更新数据源中的对应行
            const newData = rows.map((item) => {
              if (item.key === record.key) {
                return { ...item, isRecommend: checked }
              }
              return item
            })
            setRows(newData)
            await frontedBlogApi.updateArticle({
              ...record,
              id: Number(record.key),
              category: categoryOptions.find((v) => v.label === record.category)
                ?.value,
              tags:
                (record.tags?.map(
                  (tag) => tagOptions.find((v) => v.label === tag)?.value
                ) as number[]) || ([] as number[]),
              isRecommend: checked,
              updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            })
          }}
        />
      ),
    },
    {
      title: '是否推荐',
      dataIndex: 'isFeatured',
      key: 'isFeatured',
      render: (isFeatured: boolean, record) =>
        !!record.isRecommend || !!isFeatured ? (
          <Tag color="success">是</Tag>
        ) : (
          <Tag color="error">否</Tag>
        ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: StatusType) => {
        const labelMap: Record<StatusType, string> = {
          published: '已发布',
          draft: '草稿',
          deleted: '已删除',
        }
        const color =
          status === StatusTypeEnum['已发布']
            ? 'success'
            : status === StatusTypeEnum['草稿']
              ? 'processing'
              : 'error'
        return <Tag color={color}>{labelMap[status]}</Tag>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '发布时间',
      dataIndex: 'publishedAt',
      key: 'publishedAt',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: DataType) => (
        <Space size="middle">
          {/* 确认时拦截，让别人预览一下 */}
          <Button
            color="primary"
            variant="text"
            disabled={record.status === 'deleted'}
            onClick={() =>
              navigate('/articles/new', {
                state: { editId: Number(record.key) },
              })
            }
          >
            编辑
          </Button>
          <Popconfirm
            title={'确认删除该文章吗？'}
            onConfirm={() => handleDelete(Number(record.key))}
            okButtonProps={{ loading: deleteLoading }}
          >
            <PermissionButton
              color="danger"
              variant="text"
              disabled={record.status === 'deleted'}
            >
              删除
            </PermissionButton>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  // #endregion

  // #region 获取表格数据 & 筛选
  const [loading, setLoading] = React.useState(false)
  const [rows, setRows] = React.useState<DataType[]>([])
  const [searchText, setSearchText] = React.useState('')
  const [selectedTagId, setSelectedTagId] = React.useState<number | undefined>(
    undefined
  )
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    number | undefined
  >(undefined)
  const [selectedStatus, setSelectedStatus] = React.useState<
    StatusType | undefined
  >(undefined)
  const [page, setPage] = React.useState<number>(1)
  const [pageSize, setPageSize] = React.useState<number>(10)
  const [total, setTotal] = React.useState<number>(0)

  // 加载下拉框选项
  const [tagOptions, setTagOptions] = React.useState<
    Array<{ label: string; value: number }>
  >([])
  const [categoryOptions, setCategoryOptions] = React.useState<
    Array<{ label: string; value: number }>
  >([])
  const fetchFilters = React.useCallback(async () => {
    try {
      const [tags, categories] = await Promise.all([
        frontedBlogApi.getTags(),
        frontedBlogApi.getCategories(),
      ])
      setTagOptions(
        (tags ?? []).map((t: TagType) => ({ label: t.name, value: t.id }))
      )
      setCategoryOptions(
        (categories ?? []).map((c: CategoryType) => ({
          label: c.name,
          value: c.id,
        }))
      )
    } catch {
      // 错误提示已在 http 拦截器中统一处理
    }
  }, [])
  React.useEffect(() => {
    fetchFilters()
  }, [fetchFilters])

  const fetchData = React.useCallback(
    async (params?: {
      page?: number
      pageSize?: number
      search?: string
      tagId?: number
      categoryId?: number
      status?: StatusType
    }) => {
      try {
        setLoading(true)
        const usePage = params?.page ?? page
        const usePageSize = params?.pageSize ?? pageSize
        const res = await frontedBlogApi.getArticles({
          search: params?.search,
          tagId: params?.tagId,
          categoryId: params?.categoryId,
          status: params?.status,
          page: usePage,
          pageSize: usePageSize,
        })
        const items = res?.items ?? []
        const mapped: DataType[] = items.map((a) => ({
          key: String(a.id),
          title: a.title,
          summary: a.summary,
          author: a.author,
          category: a.category,
          tags: a.tags,
          isRecommend: a.isRecommend,
          isFeatured: a.isFeatured,
          status: a.status as StatusType,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt ?? '-',
          publishedAt: a.publishedAt ?? '-',
        }))
        setRows(mapped)
        setTotal(res?.total ?? 0)
        setPage(res?.page ?? usePage)
        setPageSize(res?.pageSize ?? usePageSize)
      } finally {
        setLoading(false)
      }
    },
    [page, pageSize]
  )

  // 搜索
  const [searchLoading, setSearchLoading] = React.useState<boolean>(false)
  const onSearch = React.useCallback(() => {
    setSearchLoading(true)
    setPage(1)
    fetchData({
      page: 1,
      pageSize,
      search: searchText.trim() || undefined,
      tagId: selectedTagId,
      categoryId: selectedCategoryId,
      status: selectedStatus,
    })
    setSearchLoading(false)
  }, [searchText, selectedTagId, selectedCategoryId, selectedStatus, pageSize])

  // 重置
  const onReset = React.useCallback(() => {
    setSearchText('')
    setSelectedTagId(undefined)
    setSelectedCategoryId(undefined)
    setSelectedStatus(undefined)
    setPage(1)
    fetchData({ page: 1, pageSize })
  }, [pageSize])
  // #endregion

  // 首次挂载时拉取一次数据
  React.useEffect(() => {
    fetchData({ page: 1, pageSize })
  }, [])

  // #region 编辑/新增
  // const [editModal, setEditModal] = React.useState<{
  //   visible: boolean
  //   data: TagType | null
  //   isAdd?: boolean
  // }>({ visible: false, data: null, isAdd: false })
  // const [editLoading, setEditLoading] = React.useState(false)

  // 编辑/新增弹窗提交
  // const handleEditSubmit = async (name: string) => {
  //   setEditLoading(true)
  //   try {
  //     if (editModal.isAdd) {
  //       await frontedBlogApi.createTag({ name })
  //       message.success('标签新增成功')
  //       fetchData()
  //     } else {
  //       await frontedBlogApi.updateTag({ id: editModal.data!.id, name })
  //       message.success('标签编辑成功')
  //       fetchData()
  //     }
  //     setEditModal({ visible: false, data: null, isAdd: false })
  //   } catch (err) {
  //     console.log(err)
  //   } finally {
  //     setEditLoading(false)
  //   }
  // }
  // #endregion

  // #region 删除
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false)
  const handleDelete = async (id: number) => {
    setDeleteLoading(true)
    try {
      await frontedBlogApi.deleteArticle({ id })
      message.success('文章删除成功')
      await fetchData({ page })
    } catch {
      // 统一拦截
    } finally {
      setDeleteLoading(false)
    }
  }
  // #endregion

  // #region 表格自适应滚动
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)
  const toolbarRef = React.useRef<HTMLDivElement | null>(null)
  const [tableScrollY, setTableScrollY] = React.useState<number>()

  React.useEffect(() => {
    const calcAvailableY = () => {
      const container = wrapperRef.current
      const toolbar = toolbarRef.current
      if (!container) return undefined
      const containerHeight = container.clientHeight || 0
      const toolbarHeight = toolbar?.offsetHeight || 0
      const verticalGaps = 8
      const y = containerHeight - toolbarHeight - verticalGaps
      return y > 0 ? y : undefined
    }

    const reCalc = () => {
      const availableY = calcAvailableY()
      if (!availableY) {
        setTableScrollY(undefined)
        return
      }
      // 测量表格内容高度（thead + tbody）
      const containerEl = wrapperRef.current
      const thead = containerEl?.querySelector(
        '.ant-table-thead'
      ) as HTMLElement | null
      const tbody = containerEl?.querySelector(
        '.ant-table-tbody'
      ) as HTMLElement | null
      const headH = thead?.offsetHeight || 0
      const bodyH = tbody?.offsetHeight || 0
      const paddingAllowance = 8
      const contentH = headH + bodyH + paddingAllowance
      if (contentH > availableY) {
        const bodyScrollableY = availableY - headH
        setTableScrollY(bodyScrollableY > 0 ? bodyScrollableY : undefined)
      } else {
        setTableScrollY(undefined)
      }
    }

    const ro = new ResizeObserver(() => {
      // 下一帧再量，确保 DOM 已更新
      requestAnimationFrame(reCalc)
    })
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    if (toolbarRef.current) ro.observe(toolbarRef.current)
    window.addEventListener('resize', reCalc)
    requestAnimationFrame(reCalc)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', reCalc)
    }
  }, [])
  // #endregion

  return (
    <div className="h-full w-full">
      <Card
        variant="borderless"
        className="h-full"
        classNames={{
          body: 'h-full',
        }}
      >
        <div ref={wrapperRef} className="flex h-full flex-col">
          <div
            ref={toolbarRef}
            className="mb-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="请输入文章标题"
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={onSearch}
                className="max-w-72"
              />
              <Select
                allowClear
                placeholder="请选择标签"
                className="w-48"
                options={tagOptions}
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={selectedTagId}
                onChange={(v) => setSelectedTagId(v)}
              />
              <Select
                allowClear
                placeholder="请选择分类"
                className="w-48"
                options={categoryOptions}
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={selectedCategoryId}
                onChange={(v) => setSelectedCategoryId(v)}
              />
              <Select
                allowClear
                placeholder="请选择状态"
                className="w-40"
                options={[
                  { label: '已发布', value: 'published' },
                  { label: '草稿', value: 'draft' },
                  { label: '已删除', value: 'deleted' },
                ]}
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  String(option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={selectedStatus}
                onChange={(v) => setSelectedStatus(v)}
              />
              <Space>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={onSearch}
                  loading={searchLoading}
                >
                  搜索
                </Button>
                <Button onClick={onReset} disabled={loading || searchLoading}>
                  重置
                </Button>
              </Space>
            </div>
            {/* 确认时拦截，让别人预览一下 */}
            <Button
              color="primary"
              variant="solid"
              onClick={() => navigate('/articles/new')}
            >
              新增
            </Button>
          </div>
          <Table<DataType>
            bordered
            loading={loading}
            columns={columns}
            dataSource={rows}
            pagination={{
              current: page,
              pageSize,
              total,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: (p, ps) => {
                setPage(p)
                setPageSize(ps)
                fetchData({ page: p, pageSize: ps })
              },
            }}
            scroll={{ x: 'max-content', y: tableScrollY }}
          />
        </div>
      </Card>
    </div>
  )
}

export default ArticlesPage
