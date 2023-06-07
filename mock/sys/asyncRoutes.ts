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
const threeRouter = {
  path: '/menu',
  name: 'Menu',
  meta: {
    title: '菜单嵌套'
  },
  children: [
    {
      path: '/menu/menu1',
      component: '/three/list/index',
      name: 'menu1',
      meta: {
        title: '菜单1'
      }
    },
    {
      path: '/menu/menu2',
      name: 'menu2',
      meta: {
        title: '菜单2'
      },
      children: [
        {
          path: '/menu/menu2-1',
          name: 'Menu2-1',
          meta: {
            title: '菜单2-1'
          },
          children: [
            {
              path: '/menu/menu2-1/1',
              component: '/three/list/index',
              name: 'Menu2-1-1',
              meta: {
                title: '菜单2-1-1'
              }
            },
            {
              path: '/menu/menu2-1/2',
              component: '/three/list/index',
              name: 'Menu2-1-2',
              meta: {
                title: '菜单2-1-2'
              }
            }
          ]
        }
      ]
    }
  ]
}
const test = {
  path: '/test',
  component: '/three/list/index',
  name: 'Test',
  meta: {
    title: '单页'
  }
}
export default [
  {
    url: '/api/getAsyncRoutes',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '请求成功',
        data: [systemRouter, threeRouter, test]
      }
    }
  }
] as MockMethod[]
