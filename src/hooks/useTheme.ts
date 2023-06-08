import { default_primary, globalSettings } from '@/config'
import { useSettingStoreHook } from '@/store/modules/settings'
import { getDarkColor, getLightColor } from '@/utils/color'

export type GreyOrWeakType = 'grey' | 'weak'

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

  const initTheme = () => {
    switchDark()
    if (useSettingStoreHook().isGrey) {
      changeGreyOrWeak('grey', true)
    }
    if (useSettingStoreHook().isWeak) {
      changeGreyOrWeak('weak', true)
    }
  }
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
  return {
    initTheme,
    switchDark,
    changePrimary,
    changeGreyOrWeak,
    predefineColors,
    resetTheme
  }
}
export default useTheme
