import { default_primary } from '@/config'
import { useSettingStoreHook } from '@/store/modules/settings'
import { getDarkColor, getLightColor } from '@/utils/color'

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
  const switchDark = () => {
    const html = document.documentElement as HTMLElement
    if (useSettingStoreHook().isDark) html.setAttribute('class', 'dark')
    else html.setAttribute('class', '')
    changePrimary(useSettingStoreHook().primaryColor)
  }
  const changePrimary = (color: string) => {
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
  const initTheme = () => {
    switchDark()
  }
  return {
    initTheme,
    switchDark,
    changePrimary,
    predefineColors
  }
}
export default useTheme
