import router, { resetRouter } from './index'
import NProgress from '@/utils/nprogress'
import { useUserStoreHook } from '@/store/modules/user'
import { isEmpty } from '@/utils/util'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { treeConvertToArr } from './utils'
import { loginPath } from '@/config'

/** 路由白名单 */
const allowList = [loginPath]

router.beforeEach((to, from, next) => {
  console.log('FROM', from)
  console.log('TO', to)
  NProgress.start()
  const { token, roles } = useUserStoreHook()
  if (token) {
    /** 如果已经登录并存在登录信息后不能跳转到路由白名单，而是继续保持在当前页面 */
    if (allowList.includes(to.fullPath)) {
      next(from.fullPath)
    } else {
      // 权限列表为空
      if (isEmpty(roles)) {
        useUserStoreHook()
          .getInfo()
          .then(() => {
            usePermissionStoreHook()
              .GenerateRoutes(useUserStoreHook().roles as string[])
              .then(() => {
                resetRouter()
                // 添加路由
                treeConvertToArr(usePermissionStoreHook().addRouters).forEach((e) => {
                  if (!router.hasRoute(e.name as any)) router.addRoute('Root', e)
                })

                // 请求带有 redirect 重定向时，登录自动重定向到该地址
                const redirect = decodeURIComponent((from.query?.redirect as string) || to.path)
                if (to.path === redirect) {
                  next({ ...to, replace: true })
                } else {
                  // 跳转到目的路由
                  next({ path: redirect })
                }
              })
          })
          .catch(() => {
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            useUserStoreHook()
              .logOut()
              .then(() => {
                next({ path: loginPath, query: { redirect: to.fullPath } })
              })
          })
      } else {
        next()
      }
    }
  } else {
    if (to.path !== loginPath) {
      if (allowList.includes(to.path)) {
        next()
      } else {
        next({ path: loginPath, query: { redirect: to.fullPath } })
      }
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
