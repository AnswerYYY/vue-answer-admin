import { MockMethod } from 'vite-plugin-mock'

// 模拟刷新token接口
export default [
  {
    url: '/refreshToken',
    method: 'post',
    response: ({ body }) => {
      if (body.refreshToken) {
        const role = body.refreshToken.indexOf('Admin') ? 'newAdmin' : 'newCommon'
        return {
          code: 200,
          messgae: 'Token刷新成功',
          data: {
            accessToken: `eyJhbGciOiJIUzUxMiJ9.${role}`,
            refreshToken: `eyJhbGciOiJIUzUxMiJ9.${role}Refresh`,
            expires: '2023/10/30 23:59:59'
          }
        }
      } else {
        return {
          code: 201,
          messgae: '无效refreshToken',
          data: {}
        }
      }
    }
  },
  {
    url: '/expireToken',
    method: 'get',
    response: ({ headers }) => {
      if (headers.authorization.indexOf('new') !== -1) {
        return { code: 200, messgae: '', data: {} }
      }
      return { code: 401, messgae: 'token过期', data: {} }
    }
  }
] as MockMethod[]
