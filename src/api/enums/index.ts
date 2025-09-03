export const enum ExceptionEnum {
  PAGE_NOT_ACCESS = 403,
  PAGE_NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const enum ColorMapEnum {
  magenta,
  red,
  volcano,
  orange,
  gold,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
}

export const TAG_COLOR_LIST = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
] as const

export type TagPresetColor = (typeof TAG_COLOR_LIST)[number]

export const enum StatusTypeEnum {
  // 'draft' | 'published' | 'deleted'
  '已发布' = 'published',
  '草稿' = 'draft',
  '已删除' = 'deleted',
}

export const SiteStatusType = {
  文章数: 'articleCount',
  访问次数: 'visitCount',
  日志数: 'logCount',
} as const

export const ColorMap = {
  文章数: '#1890ff',
  访问次数: '#faad14',
  日志数: '#13c2c2',
} as const

export const IconMap = {
  文章数: 'document',
  访问次数: 'person',
  日志数: 'location',
} as const
