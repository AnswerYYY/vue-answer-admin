import { store } from '@/store'
import { defineStore } from 'pinia'
import { KeepAliveState } from './types'
const useKeepAliveStore = defineStore('keep-alive', {
  state: (): KeepAliveState => ({
    keepAliveNames: []
  }),
  actions: {
    async addName(name: string) {
      !this.keepAliveNames.includes(name) && this.keepAliveNames.push(name)
    },
    async removeName(name: string) {
      this.keepAliveNames = this.keepAliveNames.filter((item) => item !== name)
    },
    async setKeepAliveNames(names: string[] = []) {
      this.keepAliveNames = names
    }
  }
})
export function useKeepAliveStoreHook() {
  return useKeepAliveStore(store)
}
