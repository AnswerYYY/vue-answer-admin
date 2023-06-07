import { createWebHashHistory, createWebHistory, RouteRecordRaw, RouterHistory } from 'vue-router'
import router from '.'
const Layout = () => import('@/layout/index.vue')

// 加载全部页面
const modulesRoutes = import.meta.glob('/src/pages/**/*.{vue,tsx}')

// 路由模式
export const getRouterHistory = (routerHistory: string): RouterHistory => {
  const historyMode = routerHistory.split(',')
  const mode = historyMode[0],
    base = historyMode[1] || ''
  if (mode.toLocaleUpperCase() === 'H5') {
    return createWebHistory(base)
  } else {
    return createWebHashHistory(base)
  }
}

// 多级嵌套路由展开为一维数组
export function treeConvertToArr(routesList: RouteRecordRaw[]) {
  let res: any[] = []
  routesList.forEach((e) => {
    if (e.children) {
      res = res.concat(treeConvertToArr(e.children))
      // delete e.children
    }
    res.push(e)
  })
  return res
}

// 一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
export function arrConvertToTree(routesList: RouteRecordRaw[]) {
  const res: RouteRecordRaw[] = []

  routesList.forEach((e) => {
    if (e.name === 'Root') {
      res[0] = {
        component: e.component,
        name: e.name,
        path: e.path,
        redirect: e.redirect,
        meta: e.meta,
        children: []
      }
    } else {
      res[0]?.children?.push({ ...e })
    }
  })
  return res
}

/**
 * 过滤账户是否拥有某一个权限
 *
 * @param roles
 * @param route
 * @returns {boolean}
 */
export function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    if (roles === undefined) {
      return false
    }
    return roles.some((e) => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(e)
      } else {
        return false
      }
    })
  } else {
    return true
  }
}

// 过滤没有权限的菜单
export function filterAsyncRouter(routers: RouteRecordRaw[], roles: string[]) {
  const accessedRouters = routers.filter((route) => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// 过滤隐藏的菜单
export function filterHiddenRouter(routers: RouteRecordRaw[]) {
  const accessedRouters = routers.filter((route) => {
    if (route.children && route.children.length) {
      if (route.children.length === 1 && route.children[0].meta?.hidden) {
        delete route.children
      } else {
        route.children = filterHiddenRouter(route.children)
      }
    }
    return !route.meta?.hidden
  })
  return accessedRouters
}
/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export function generator(routers: any[]): RouteRecordRaw[] {
  const modulesRoutesKeys = Object.keys(modulesRoutes)
  routers.forEach((e) => {
    if (e.component === 'Layout') {
      e.component = Layout
    } else {
      const index = e.component
        ? modulesRoutesKeys.findIndex((ev) => ev === `/src/pages${e.component}.vue`)
        : modulesRoutesKeys.findIndex((ev) => ev === `/src/pages${e.path}.vue`)
      e.component = modulesRoutes[modulesRoutesKeys[index]]
    }
    if (e.children && e.children.length) {
      if (!e.redirect) {
        e.redirect = e.children[0].path
      }
      e.children = generator(e.children)
    }
  })
  return routers
}

export function addPathMatch() {
  if (!router.hasRoute('pathMatch')) {
    router.addRoute({
      path: '/:pathMatch(.*)',
      name: 'pathMatch',
      redirect: '/404'
    })
  }
}
