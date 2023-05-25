// 模拟后端动态生成路由
import { MockMethod } from 'vite-plugin-mock'

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */

const systemRouter = {
  path: '/system',
  name: 'System',
  component: 'Layout',
  meta: {
    title: '系统管理'
  },
  children: [
    {
      path: '/system/user/index',
      name: 'User',
      meta: {
        title: '用户',
        roles: ['admin']
      }
    },
    {
      path: '/system/role/index',
      name: 'Role',
      meta: {
        title: '角色',
        roles: ['admin']
      }
    },
    {
      path: '/system/dept/index',
      name: 'Dept',
      meta: {
        title: '部门',
        roles: ['admin']
      }
    }
  ]
}

export default [
  {
    url: '/api/getAsyncRoutes',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '请求成功',
        data: [systemRouter]
      }
    }
  }
] as MockMethod[]
