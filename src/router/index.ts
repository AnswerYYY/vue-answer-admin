import { Router, createRouter, RouteRecordRaw } from 'vue-router'
import { getRouterHistory } from './utils'

/** 原始静态路由 */
const routes: RouteRecordRaw[] = []

/** 自动导入全部静态路由
 */
const modules: Record<string, any> = import.meta.glob(['./modules/**/*.ts'], {
  eager: true
})
Object.keys(modules).forEach((key) => {
  routes.push(modules[key].default)
})

/** 静态菜单路由 */
export const constantMenus: RouteRecordRaw[] = routes.flat(Infinity)

const router: Router = createRouter({
  history: getRouterHistory(import.meta.env.VITE_ROUTER_HISTORY),
  routes: constantMenus
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
