import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')
export default {
  path: '/',
  name: 'Root',
  redirect: '/welcome',
  component: Layout,
  children: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('@/pages/welcome/index.vue'),
      meta: {
        icon: 'iconfont icon-shouye',
        title: '首页',
        isAffix: true
      }
    }
  ]
} as RouteRecordRaw
