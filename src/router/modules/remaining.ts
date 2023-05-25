import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')
export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/redirect',
    name: 'RedirectLayout',
    component: Layout,
    meta: {
      title: '重定向',
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/layout/redirect.vue'),
        meta: {
          title: '重定向页面'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/pages/error/404.vue'),
    meta: {
      hidden: true
    },
    alias: '/:pathMatch(.*)*'
  }
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/pages/error/404.vue'),
  //   meta: {
  //     hidden: true
  //   }
  // },
  // {
  //   path: '/:pathMatch(.*)',
  //   name: 'pathMatch',
  //   redirect: '/404'
  // }
] as RouteRecordRaw[]
