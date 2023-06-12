import { store } from '@/store'
import { defineStore } from 'pinia'
import { tabsState, tabsMenuProps } from './types'
import router from '@/router'

export const useTabsStore = defineStore('tabs', {
  state: (): tabsState => ({
    tabsList: []
  }),
  actions: {
    /* 添加 */
    async addTab(tab: tabsMenuProps) {
      if (this.tabsList.every((e) => e.path !== tab.path)) {
        this.tabsList.push(tab)
      }
    },
    /* 移除 */
    async removeTab(tabPath: string, isCurrent = true) {
      const tabsList = this.tabsList
      if (isCurrent) {
        tabsList.forEach((e, index) => {
          if (e.path !== tabPath) return
          const nextTab = tabsList[index + 1] || tabsList[index - 1]
          if (!nextTab) return
          router.push(nextTab.path)
        })
      }
      this.tabsList = tabsList.filter((e) => e.path !== tabPath)
    },
    /* 关闭其它或全部 */
    async closMultiple(tabPath?: string) {
      this.tabsList = this.tabsList.filter((e) => {
        return e.path === tabPath || !e.close
      })
    },
    /* 设置tabsList */
    async setTabsList(list: tabsMenuProps[]) {
      this.tabsList = list
    },
    /* 设置tab title */
    async setTabTitle(title: string) {
      const fullPath = location.hash.substring(1)
      this.tabsList.forEach((e) => {
        if (e.path === fullPath) {
          e.title = title
        }
      })
    }
  }
  // persist: { key: 'tabs' }
})

export function useTabsStoreHook() {
  return useTabsStore(store)
}
