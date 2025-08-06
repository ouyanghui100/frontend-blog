import React from 'react'
import { Button, Card, Col, List, message, Row, Tooltip } from 'antd'
import type { EChartsOption } from 'echarts'
import { frontedBlogApi } from '@/api'
import type { Category, Tag } from '@/api/frontedBlogApi'
import ChartsCard from '@/components/ChartsCard'
import { PermissionButton, type Role } from '@/components/HOC/PermissionButton'
import { useUserStore } from '@/store/user'
import { messageBox } from '@/utils/messageBox'
import AddOrEditModal from './components/AddOrEditModal'
import CountUpCard from './components/CountUpCard'

export const countUpData = [
  {
    title: '文章数',
    icon: 'document',
    count: 682,
    color: '#1890ff',
  },
  {
    title: '评论数',
    icon: 'message',
    count: 259,
    color: '#fa541c',
  },
  {
    title: '访问次数',
    icon: 'person',
    count: 1262,
    color: '#faad14',
  },
  {
    title: '日志数',
    icon: 'location',
    count: 508,
    color: '#13c2c2',
  },
]

export const pieOptions: EChartsOption = {
  legend: {
    bottom: 0,
    data: ['推广渠道', '访问来源', '广告投放'],
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  series: [
    {
      name: '来源构成',
      type: 'pie',
      radius: ['40%', '70%'], // 环形饼图，去掉就是普通饼图
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        formatter: '{b}: {c}',
      },
      labelLine: {
        show: true,
      },
      data: [
        {
          value: 1920 + 1920 + 1920,
          name: '推广渠道',
          itemStyle: {
            color: '#1890ff',
          },
        },
        {
          value: 1920 + 0 + 0 + 1920 + 1920,
          name: '访问来源',
          itemStyle: {
            color: '#722ed1',
          },
        },
        {
          value: 920 * 5,
          name: '广告投放',
          itemStyle: {
            color: '#faad14',
          },
        },
      ],
    },
  ],
}

const HomePage: React.FC = () => {
  const { userInfo } = useUserStore()
  const [isCategoriesLoading, setIsCategoriesLoading] = React.useState(true)
  const [isTagsLoading, setIsTagsLoading] = React.useState(true)

  const [categoriesList, setCategoriesList] = React.useState<Category[]>([])
  const [tagsList, setTagsList] = React.useState<Tag[]>([])

  // 提取到组件作用域，供编辑/删除后调用
  const fetchCategories = async () => {
    try {
      setIsCategoriesLoading(true)
      const res = await frontedBlogApi.getCategories({})
      setCategoriesList(res || [])
      setIsCategoriesLoading(false)
    } catch (error) {
      console.log(error)
      setIsCategoriesLoading(false)
    }
  }
  const fetchTags = async () => {
    try {
      setIsTagsLoading(true)
      const res = await frontedBlogApi.getTags({})
      setTagsList(res || [])
      setIsTagsLoading(false)
    } catch (error) {
      console.log(error)
      setIsTagsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchCategories()
    fetchTags()
  }, [])

  // #region 编辑/新增
  const [editModal, setEditModal] = React.useState<{
    visible: boolean
    type: 'category' | 'tag' | null
    data: Category | Tag | null
    isAdd?: boolean
  }>({ visible: false, type: null, data: null, isAdd: false })
  const [editLoading, setEditLoading] = React.useState(false)

  // 编辑/新增弹窗提交
  const handleEditSubmit = async (name: string) => {
    setEditLoading(true)
    try {
      if (editModal.type === 'category') {
        if (editModal.isAdd) {
          await frontedBlogApi.createCategory({ name })
          message.success('分类新增成功')
          fetchCategories()
        } else {
          await frontedBlogApi.updateCategory({ id: editModal.data!.id, name })
          message.success('分类编辑成功')
          fetchCategories()
        }
      } else if (editModal.type === 'tag') {
        if (editModal.isAdd) {
          await frontedBlogApi.createTag({ name })
          message.success('标签新增成功')
          fetchTags()
        } else {
          await frontedBlogApi.updateTag({ id: editModal.data!.id, name })
          message.success('标签编辑成功')
          fetchTags()
        }
      }
      setEditModal({ visible: false, type: null, data: null, isAdd: false })
    } catch (err) {
      console.log(err)
    } finally {
      setEditLoading(false)
    }
  }
  // #endregion

  // #region 删除
  const [deleteLoading, setDeleteLoading] = React.useState<{
    type: 'category' | 'tag'
    id: number
  } | null>(null)

  // 删除逻辑
  const handleDelete = (type: 'category' | 'tag', id: number) => {
    const { createConfirm } = messageBox()
    createConfirm({
      title: `确定要删除该${type === 'category' ? '分类' : '标签'}吗？`,
      content: '删除后不可恢复，是否继续？',
      iconType: 'warning',
      onOk: async () => {
        setDeleteLoading({ type, id })
        try {
          if (type === 'category') {
            await frontedBlogApi.deleteCategory({ id })
            message.success('分类删除成功')
            fetchCategories()
          } else {
            await frontedBlogApi.deleteTag({ id })
            message.success('标签删除成功')
            fetchTags()
          }
        } catch (err) {
          console.log(err)
        } finally {
          setDeleteLoading(null)
        }
      },
    })
  }
  // #endregion

  return (
    <div className="flex h-full flex-col gap-3">
      <Row gutter={[12, 12]}>
        {countUpData.map((item) => (
          <Col flex={1} key={item.title}>
            <CountUpCard
              title={item.title}
              color={item.color}
              iconName={item.icon}
              countNum={item.count}
              loading={false}
            />
          </Col>
        ))}
      </Row>
      <Row gutter={12} style={{ height: '100%', minHeight: 0, flex: 1 }}>
        <Col span={12} style={{ height: '100%' }}>
          <ChartsCard options={pieOptions} height="100%" loading={false} />
        </Col>
        <Col span={6} style={{ height: '100%' }}>
          <Card
            className="h-full"
            classNames={{
              body: 'h-full',
            }}
          >
            <div className="flex h-full w-full flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-[20px] font-[600]">分类</span>
                <PermissionButton
                  type="primary"
                  role={userInfo?.role as Role | undefined}
                  onClick={() =>
                    setEditModal({
                      visible: true,
                      type: 'category',
                      data: null,
                      isAdd: true,
                    })
                  }
                >
                  新增
                </PermissionButton>
              </div>

              <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
                <List
                  loading={isCategoriesLoading}
                  itemLayout="horizontal"
                  dataSource={categoriesList}
                  renderItem={(item, _index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Tooltip title="文章总数">
                            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-black">
                              {item.articleCount}
                            </div>
                          </Tooltip>
                        }
                        title={
                          <div className="flex items-center justify-between">
                            <div>{item.name}</div>
                            <div className="flex items-center gap-1">
                              <PermissionButton
                                color="primary"
                                role={userInfo?.role as Role | undefined}
                                variant="text"
                                onClick={() =>
                                  setEditModal({
                                    visible: true,
                                    type: 'category',
                                    data: item,
                                  })
                                }
                              >
                                编辑
                              </PermissionButton>
                              <PermissionButton
                                type="text"
                                role={userInfo?.role as Role | undefined}
                                danger
                                loading={
                                  deleteLoading?.type === 'category' &&
                                  deleteLoading?.id === item.id
                                }
                                onClick={() =>
                                  handleDelete('category', item.id)
                                }
                              >
                                删除
                              </PermissionButton>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6} style={{ height: '100%' }}>
          <Card
            className="h-full"
            classNames={{
              body: 'h-full',
            }}
          >
            <div className="flex h-full w-full flex-col gap-1">
              <div className="flex justify-between">
                <span className="text-[20px] font-[600]">标签</span>
                <PermissionButton
                  role={userInfo?.role as Role | undefined}
                  type="primary"
                  onClick={() =>
                    setEditModal({
                      visible: true,
                      type: 'tag',
                      data: null,
                      isAdd: true,
                    })
                  }
                >
                  新增
                </PermissionButton>
              </div>

              <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
                <List
                  itemLayout="horizontal"
                  dataSource={tagsList}
                  loading={isTagsLoading}
                  renderItem={(item, _index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Tooltip title="使用次数">
                            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-black">
                              {item.usageCount}
                            </div>
                          </Tooltip>
                        }
                        title={
                          <div className="flex items-center justify-between">
                            <div>{item.name}</div>
                            <div className="flex items-center gap-1">
                              <PermissionButton
                                role={userInfo?.role as Role | undefined}
                                color="primary"
                                variant="text"
                                onClick={() =>
                                  setEditModal({
                                    visible: true,
                                    type: 'tag',
                                    data: item,
                                  })
                                }
                              >
                                编辑
                              </PermissionButton>
                              <PermissionButton
                                type="text"
                                role={userInfo?.role as Role | undefined}
                                danger
                                loading={
                                  deleteLoading?.type === 'tag' &&
                                  deleteLoading?.id === item.id
                                }
                                onClick={() => handleDelete('tag', item.id)}
                              >
                                删除
                              </PermissionButton>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <AddOrEditModal
        open={editModal.visible}
        title={
          editModal.isAdd
            ? editModal.type === 'category'
              ? '新增分类'
              : '新增标签'
            : editModal.type === 'category'
              ? '编辑分类'
              : '编辑标签'
        }
        initialName={editModal.data?.name}
        loading={editLoading}
        onOk={handleEditSubmit}
        onCancel={() =>
          setEditModal({ visible: false, type: null, data: null, isAdd: false })
        }
      />
    </div>
  )
}

export default HomePage
