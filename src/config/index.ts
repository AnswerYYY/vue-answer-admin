export const default_primary = '#409eff'
export type AssemblySizeType = 'large' | 'default' | 'small'
export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'
export interface globalSettings {
  layout: LayoutType
  isDark: boolean
  primaryColor: string
  isGrey: boolean
  isWeak: boolean
  assemblySize: AssemblySizeType
  footer: boolean
  isCollapse: boolean
  asideInverted: boolean
  allKeepAlive: boolean
  breadcrumb: boolean
  breadcrumbIcon: boolean
  tabs: boolean
  tabsIcon: boolean
}

export const globalSettings: globalSettings = {
  // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
  layout: 'vertical',
  asideInverted: false,
  isDark: false,
  primaryColor: default_primary,
  isGrey: false,
  isWeak: false,
  assemblySize: 'default',
  footer: true,
  isCollapse: false,
  allKeepAlive: false,
  breadcrumb: true,
  breadcrumbIcon: true,
  tabs: true,
  tabsIcon: true
}

/** 登录页面 */
export const loginPath = '/login'
