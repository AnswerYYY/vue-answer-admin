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
    title: '系统管理',
    roles: ['admin'],
    icon: 'iconfont icon-diannao'
  },
  children: [
    {
      path: '/system/user/index',
      name: 'User',
      meta: {
        title: '用户',
        roles: ['admin'],
        icon: 'iconfont icon-qunzu'
      }
    },
    {
      path: '/system/role/index',
      name: 'Role',
      meta: {
        title: '角色',
        roles: ['admin'],
        keepAlive: true,
        icon: 'iconfont icon-gerentouxiang'
      }
    },
    {
      path: '/system/dept/index',
      name: 'Dept',
      meta: {
        title: '部门',
        roles: ['admin'],
        icon: 'iconfont icon-shuzhuangtu'
      }
    }
  ]
}
const threeRouter = {
  path: '/menu',
  name: 'Menu',
  meta: {
    title: '菜单嵌套',
    icon: 'iconfont icon-caidan'
  },
  children: [
    {
      path: '/menu/menu1',
      component: '/menu/menu1/index',
      name: 'Menu1',
      meta: {
        title: '菜单1',
        keepAlive: true
      }
    },
    {
      path: '/menu/menu2',
      name: 'Menu2',
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
              component: '/menu/menu2/menu211',
              name: 'Menu211',
              meta: {
                title: '菜单2-1-1'
              }
            },
            {
              path: '/menu/menu2-1/2',
              component: '/menu/menu2/menu212',
              name: 'Menu212',
              meta: {
                title: '菜单2-1-2',
                keepAlive: true
              }
            }
          ]
        }
      ]
    }
  ]
}
const BtnAuths = {
  path: '/btnauths',
  component: '/auths/index',
  name: 'BtnAuths',
  meta: {
    title: '按钮权限',
    auths: ['btn_add', 'btn_edit', 'btn_delete', 'btn_import', 'btn_export'],
    icon: 'iconfont icon-anquan'
  }
}
const Detail = {
  path: '/detail',
  name: 'DetailIndex',
  meta: {
    title: '测试详情',
    icon: 'iconfont icon-anquan',
    hidden: true
  },
  children: [
    {
      path: '/detail/test',
      component: '/detail/index',
      name: 'Detail',
      meta: {
        title: '详情页',
        icon: 'iconfont icon-anquan',
        hidden: true
      }
    }
  ]
}

const IconSelector = {
  path: '/iconSelector',
  component: '/iconSelector/index',
  name: 'IconSelector',
  meta: {
    title: '图标选择器',
    icon: 'iconfont icon-biaoqing'
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
        data: [systemRouter, threeRouter, BtnAuths, Detail, IconSelector]
      }
    }
  }
] as MockMethod[]
