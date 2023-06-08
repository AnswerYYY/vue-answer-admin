import { store } from '@/store'
import { defineStore } from 'pinia'
import { globalSettings } from '@/config'

export const useSettingStore = defineStore('setting', {
  state: () => {
    return Object.assign({}, globalSettings)
  },
  actions: {
    setSettings(...args: ObjToKeyValArray<globalSettings>) {
      this.$patch({ [args[0]]: args[1] })
    }
  },
  persist: {
    key: 'settings'
  }
})

export function useSettingStoreHook() {
  return useSettingStore(store)
}
