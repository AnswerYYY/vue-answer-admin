import { default_primary, globalSettings } from '@/config'
import { useSettingStoreHook } from '@/store/modules/settings'
import { getDarkColor, getLightColor } from '@/utils/color'

export type GreyOrWeakType = 'grey' | 'weak'
export type AsideThemeType = 'light' | 'inverted' | 'dark'

export const asideTheme: Record<AsideThemeType, { [key: string]: string }> = {
  light: {
    '--el-logo-text-color': '#303133',
    '--el-menu-bg-color': '#ffffff',
    '--el-menu-hover-bg-color': '#cccccc',
    '--el-menu-active-bg-color': 'var(--el-color-primary-light-9)',
    '--el-menu-text-color': '#333333',
    '--el-menu-active-color': 'var(--el-color-primary)',
    '--el-menu-hover-text-color': '#333333',
    '--el-menu-horizontal-sub-item-height': '50px'
  },
  inverted: {
    '--el-logo-text-color': '#dadada',
    '--el-menu-bg-color': '#191a20',
    '--el-menu-hover-bg-color': '#000000',
    '--el-menu-active-bg-color': '#000000',
    '--el-menu-text-color': '#bdbdc0',
    '--el-menu-active-color': '#ffffff',
    '--el-menu-hover-text-color': '#ffffff',
    '--el-menu-horizontal-sub-item-height': '50px'
  },
  dark: {
    '--el-logo-text-color': '#dadada',
    '--el-menu-bg-color': '#141414',
    '--el-menu-hover-bg-color': '#000000',
    '--el-menu-active-bg-color': '#000000',
    '--el-menu-text-color': '#bdbdc0',
    '--el-menu-active-color': '#ffffff',
    '--el-menu-hover-text-color': '#ffffff',
    '--el-menu-horizontal-sub-item-height': '50px'
  }
}

const useTheme = () => {
  const predefineColors = [
    default_primary,
    '#daa96e',
    '#0c819f',
    '#409eff',
    '#27ae60',
    '#ff5c93',
    '#e74c3c',
    '#fd726d',
    '#f39c12',
    '#9b59b6'
  ]
  // 暗黑模式
  const switchDark = () => {
    const html = document.documentElement as HTMLElement
    if (useSettingStoreHook().isDark) html.setAttribute('class', 'dark')
    else html.setAttribute('class', '')
    changePrimary(useSettingStoreHook().primaryColor)
    setAsideTheme()
  }
  const changePrimary = (color: string | null) => {
    if (!color) {
      color = default_primary
    }
    // 计算主题颜色变化
    document.documentElement.style.setProperty('--el-color-primary', color)
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      useSettingStoreHook().isDark ? `${getLightColor(color, 0.2)}` : `${getDarkColor(color, 0.3)}`
    )
    for (let i = 1; i <= 9; i++) {
      const primaryColor = useSettingStoreHook().isDark
        ? `${getDarkColor(color, i / 10)}`
        : `${getLightColor(color, i / 10)}`
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor)
    }
    useSettingStoreHook().setSettings('primaryColor', color)
  }

  // 灰色和弱色切换
  const changeGreyOrWeak = (type: GreyOrWeakType, value: boolean) => {
    const body = document.body as HTMLElement
    if (!value) return body.removeAttribute('style')
    const styles: Record<GreyOrWeakType, string> = {
      grey: 'filter: grayscale(1)',
      weak: 'filter: invert(80%)'
    }
    body.setAttribute('style', styles[type])
    const propName = type === 'grey' ? 'isWeak' : 'isGrey'
    useSettingStoreHook().setSettings(propName, false)
  }
  // 初始化设置
  const initTheme = () => {
    switchDark()
    if (useSettingStoreHook().isGrey) {
      changeGreyOrWeak('grey', true)
    }
    if (useSettingStoreHook().isWeak) {
      changeGreyOrWeak('weak', true)
    }
  }
  // 还原设置
  const resetTheme = () => {
    window.localStorage.removeItem('settings')
    let key: keyof globalSettings
    for (key in globalSettings) {
      const value = globalSettings[key]
      useSettingStoreHook().setSettings(key, value as any)
    }
    changeGreyOrWeak('grey', false)
    changeGreyOrWeak('weak', false)
    initTheme()
  }

  // 设置侧边栏样式 ==> light、inverted、dark
  const setAsideTheme = () => {
    // 默认所有侧边栏为 light 模式
    let type: AsideThemeType = 'light'
    // 侧边栏反转色目前只支持在 vertical、classic 布局模式下生效 || transverse 布局下菜单栏默认为 inverted 模式
    if (
      (['vertical', 'classic'].includes(useSettingStoreHook().layout) &&
        useSettingStoreHook().asideInverted) ||
      useSettingStoreHook().layout == 'transverse'
    ) {
      type = 'inverted'
    }
    // 侧边栏 dark 模式
    if (useSettingStoreHook().isDark) type = 'dark'
    const theme = asideTheme[type!]
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value)
    }
  }
  return {
    initTheme,
    switchDark,
    setAsideTheme,
    changePrimary,
    changeGreyOrWeak,
    predefineColors,
    resetTheme
  }
}
export default useTheme
