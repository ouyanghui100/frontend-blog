import { http } from './http'

// 标签类型定义
export interface Tag {
  id: number
  name: string
  usageCount: number
  createdAt: string
  updatedAt?: string | null
  lastUsedAt?: string | null
  isPopular: boolean
}

// 分类类型定义
export interface Category {
  id: number
  name: string
  articleCount: number
  createdAt: string
  updatedAt?: string | null
}

// 用户类型定义
export interface User {
  id: number
  username: string
  role: string
}

// 认证检查类型
export interface AuthCheck {
  valid: boolean
  role: string
}

// 分类统计类型
export interface CategoryStatistics {
  total: number
  totalArticles: number
}

// ========== 标签相关接口 ==========
// 创建标签
export const createTag = (data: { name: string; createdAt?: string }) =>
  http<Tag>({
    url: '/v1/tags',
    method: 'post',
    data,
  })

// 获取标签列表
export const getTags = (params?: { search?: string }) =>
  http<Tag[]>({
    url: '/v1/tags',
    method: 'get',
    params,
  })

// 获取标签详情
export const getTagDetail = (id: number) =>
  http<Tag>({
    url: `/v1/tags/${id}`,
    method: 'get',
  })

// 更新标签
export const updateTag = (data: {
  id: number
  name?: string
  updatedAt?: string
}) =>
  http<Tag>({
    url: '/v1/tags',
    method: 'patch',
    data,
  })

// 删除标签
export const deleteTag = (data: { id: number }) =>
  http<null>({
    url: '/v1/tags',
    method: 'delete',
    data,
  })

// 获取热门标签
export const getPopularTags = (params?: { minUsage?: number }) =>
  http<Tag[]>({
    url: '/v1/tags/popular',
    method: 'get',
    params,
  })

// ========== 分类相关接口 ==========
// 创建分类
export const createCategory = (data: { name: string; createdAt?: string }) =>
  http<Category>({
    url: '/v1/categories',
    method: 'post',
    data,
  })

// 获取分类列表
export const getCategories = (params?: { search?: string }) =>
  http<Category[]>({
    url: '/v1/categories',
    method: 'get',
    params,
  })

// 获取分类详情
export const getCategoryDetail = (id: number) =>
  http<Category>({
    url: `/v1/categories/${id}`,
    method: 'get',
  })

// 更新分类
export const updateCategory = (data: {
  id: number
  name?: string
  updatedAt?: string
}) =>
  http<Category>({
    url: '/v1/categories',
    method: 'patch',
    data,
  })

// 删除分类
export const deleteCategory = (data: { id: number }) =>
  http<null>({
    url: '/v1/categories',
    method: 'delete',
    data,
  })

// 获取热门分类
export const getPopularCategories = (params?: { minArticles?: number }) =>
  http<Category[]>({
    url: '/v1/categories/popular',
    method: 'get',
    params,
  })

// 获取分类统计信息
export const getCategoryStatistics = () =>
  http<CategoryStatistics>({
    url: '/v1/categories/statistics',
    method: 'get',
  })

// ========== 前台标签/分类接口 ==========
export const getFrontendTags = (params?: { search?: string }) =>
  http<Tag[]>({
    url: '/v1/frontend/tags',
    method: 'get',
    params,
  })

export const getFrontendPopularTags = (params?: { limit?: number }) =>
  http<Tag[]>({
    url: '/v1/frontend/tags/popular',
    method: 'get',
    params,
  })

export const getFrontendCategories = (params?: { search?: string }) =>
  http<Category[]>({
    url: '/api/v1/frontend/categories',
    method: 'get',
    params,
  })

export const getFrontendPopularCategories = (params?: { limit?: number }) =>
  http<Category[]>({
    url: '/v1/frontend/categories/popular',
    method: 'get',
    params,
  })

// ========== 认证相关接口 ==========
// 管理员登录
export const adminLogin = (data: { username: string; password: string }) =>
  http<{ accessToken: string; user: User }>({
    url: '/v1/auth/login',
    method: 'post',
    data,
  })

// 游客访问
export const guestAccess = () =>
  http<{ accessToken: string; user: User }>({
    url: '/v1/auth/guest',
    method: 'post',
  })

// 获取当前用户信息
export const getProfile = () =>
  http<User>({
    url: '/v1/auth/profile',
    method: 'get',
  })

// 检查认证状态
export const checkAuth = () =>
  http<AuthCheck>({
    url: '/v1/auth/check',
    method: 'get',
  })
