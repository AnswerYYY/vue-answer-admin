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
}

export const globalSettings: globalSettings = {
  // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
  layout: 'vertical',
  isDark: false,
  primaryColor: default_primary,
  isGrey: false,
  isWeak: false,
  assemblySize: 'default',
  footer: true,
  isCollapse: false
}
