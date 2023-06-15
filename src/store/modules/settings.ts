import { store } from '@/store'
import { defineStore } from 'pinia'
import { globalSettings } from '@/config'
import piniaPersistConfig from '@/config/piniaPersist'

export const useSettingStore = defineStore('settings', {
  state: (): globalSettings => {
    return Object.assign({}, globalSettings)
  },
  actions: {
    setSettings(...args: ObjToKeyValArray<globalSettings>) {
      this.$patch({ [args[0]]: args[1] })
    }
  },
  persist: piniaPersistConfig('settings')
})

export function useSettingStoreHook() {
  return useSettingStore(store)
}
