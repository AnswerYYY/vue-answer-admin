import { store } from '@/store'
import { defineStore } from 'pinia'
import { constantMenus } from '@/router'
import { getAsyncRoutes } from '@/api/routes'
import { filterAsyncRouter, generator, filterHiddenRouter } from '@/router/utils'
import { cloneDeep } from 'lodash'
import { PermissionState } from './types'

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    // 静态路由
    constantMenus,
    // 动态添加路由
    addRouters: [],
    // 完整路由
    completeMenus: []
  }),
  getters: {},
  actions: {
    handleCompleteMenus(routes: any[]) {
      this.completeMenus = this.constantMenus.concat(routes)
    },
    GenerateRoutes(roles: string[]) {
      return new Promise((resolve, reject) => {
        getAsyncRoutes()
          .then((res) => {
            const asyncRouters = generator(filterAsyncRouter(cloneDeep(res.data), roles))
            this.addRouters = asyncRouters
            this.handleCompleteMenus(filterHiddenRouter(cloneDeep(asyncRouters)))
            resolve(asyncRouters)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})

export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
