import { RouteRecordRaw } from 'vue-router'
const Layout = () => import('@/layout/index.vue')
export default {
  path: '/table',
  name: 'Table',
  redirect: '/table/list',
  component: Layout,
  meta: {
    title: '表格',
    icon: 'iconfont icon-biaoge'
  },
  children: [
    {
      path: '/table/list1',
      name: 'TableList1',
      component: () => import('@/pages/table/index.vue'),
      meta: {
        title: '表格列表'
      }
    },
    {
      path: '/table/list2',
      name: 'TableList2',
      component: () => import('@/pages/table/index.vue'),
      meta: {
        title: '表格列表2'
      }
    }
  ]
} as RouteRecordRaw
