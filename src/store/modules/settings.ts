import { store } from '@/store'
import { defineStore } from 'pinia'

export interface settingType {
  isDark: boolean
}

export const useSettingStore = defineStore('setting', {
  state: (): settingType => ({
    isDark: false
  }),
  persist: {
    key: 'settings'
  }
})

export function useSettingStoreHook() {
  return useSettingStore(store)
}
