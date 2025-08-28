import React from 'react'
import {
  Button,
  Card,
  Input,
  message,
  Popconfirm,
  Space,
  Table,
  type TableProps,
  Tag,
} from 'antd'
import { frontedBlogApi } from '@/api'
import type { Tag as TagType } from '@/api/frontedBlogApi'
import { PermissionButton } from '@/components/HOC/PermissionButton'
import AddOrEditModal from '../Home/components/AddOrEditModal'

interface DataType {
  key: string
  name: string
  usageCount: number
  createdAt: string
  updatedAt: string
  lastUsedAt: string
  isPopular: boolean
}

const TagsPage: React.FC = () => {
  // #region 表单结构
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: '使用次数',
      dataIndex: 'usageCount',
      key: 'usageCount',
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
      title: '最近一次使用时间',
      dataIndex: 'lastUsedAt',
      key: 'lastUsedAt',
    },
    {
      title: '是否流行',
      dataIndex: 'isPopular',
      key: 'isPopular',
      // 不能这样 必须返回一个实际的 DOM 元素或者组件，而不是一个 Fragment。
      // render: (isPopular: boolean) => (
      //   <>
      //     {isPopular ? (
      //       <Tag color="success">是</Tag>
      //     ) : (
      //       <Tag color="processing">否</Tag>
      //     )}
      //   </>
      // ),
      render: (isPopular: boolean) =>
        isPopular ? (
          <Tag color="success">是</Tag>
        ) : (
          <Tag color="processing">否</Tag>
        ),
    },
    {
      title: '操作',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <PermissionButton
            color="primary"
            variant="text"
            onClick={() =>
              setEditModal({
                visible: true,
                data: { ...record, id: Number(record.key) },
              })
            }
          >
            编辑
          </PermissionButton>
          <Popconfirm
            title={`确认删除标签【${record.name}】吗？`}
            onConfirm={() => handleDelete(Number(record.key))}
            okButtonProps={{ loading: deleteLoading }}
          >
            <PermissionButton color="danger" variant="text">
              删除
            </PermissionButton>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  // #endregion

  // #region 获取表格数据
  const [loading, setLoading] = React.useState(false)
  const [rows, setRows] = React.useState<DataType[]>([])
  const [searchText, setSearchText] = React.useState('')

  const mapToRow = React.useCallback((item: TagType): DataType => {
    return {
      key: String(item.id),
      name: item.name,
      usageCount: item.usageCount,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt ?? '-',
      lastUsedAt: item.lastUsedAt ?? '-',
      isPopular: item.isPopular,
    }
  }, [])

  const fetchData = React.useCallback(
    async (search?: string) => {
      try {
        setLoading(true)
        const list = await frontedBlogApi.getTags(
          search ? { search } : undefined
        )
        setRows((list ?? []).map(mapToRow))
      } catch {
        // 错误提示已在 http 拦截器中统一处理
      } finally {
        setLoading(false)
      }
    },
    [mapToRow]
  )

  // 搜索
  const [searchLoading, setSearchLoading] = React.useState<boolean>(false)
  const onSearch = React.useCallback(() => {
    setSearchLoading(true)
    fetchData(searchText.trim() || undefined)
    setSearchLoading(false)
  }, [fetchData, searchText])

  // 重置
  const onReset = React.useCallback(() => {
    setSearchText('')
    fetchData(undefined)
  }, [fetchData])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])
  // #endregion

  // #region 编辑/新增
  const [editModal, setEditModal] = React.useState<{
    visible: boolean
    data: TagType | null
    isAdd?: boolean
  }>({ visible: false, data: null, isAdd: false })
  const [editLoading, setEditLoading] = React.useState(false)

  // 编辑/新增弹窗提交
  const handleEditSubmit = async (name: string) => {
    setEditLoading(true)
    try {
      if (editModal.isAdd) {
        await frontedBlogApi.createTag({ name })
        message.success('标签新增成功')
        fetchData()
      } else {
        await frontedBlogApi.updateTag({ id: editModal.data!.id, name })
        message.success('标签编辑成功')
        fetchData()
      }
      setEditModal({ visible: false, data: null, isAdd: false })
    } catch (err) {
      console.log(err)
    } finally {
      setEditLoading(false)
    }
  }
  // #endregion

  // #region 删除
  const [deleteLoading, setDeleteLoading] = React.useState<boolean>(false)
  const handleDelete = async (id: number) => {
    setDeleteLoading(true)
    await frontedBlogApi.deleteTag({ id })
    setDeleteLoading(false)
    message.success('标签删除成功')
    await fetchData()
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
                placeholder="请输入标签名称"
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onPressEnter={onSearch}
                className="max-w-72"
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
            <PermissionButton
              color="primary"
              variant="solid"
              onClick={() =>
                setEditModal({
                  visible: true,
                  data: null,
                  isAdd: true,
                })
              }
            >
              新增
            </PermissionButton>
          </div>
          <Table<DataType>
            bordered
            loading={loading}
            columns={columns}
            dataSource={rows}
            pagination={false}
            scroll={{ x: 'max-content', y: tableScrollY }}
          />
        </div>
      </Card>
      <AddOrEditModal
        open={editModal.visible}
        title={editModal.isAdd ? '新增标签' : '编辑标签'}
        initialName={editModal.data?.name}
        loading={editLoading}
        onOk={handleEditSubmit}
        onCancel={() =>
          setEditModal({ visible: false, data: null, isAdd: false })
        }
      />
    </div>
  )
}

export default TagsPage
