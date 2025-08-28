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
