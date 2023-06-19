import { MockMethod } from 'vite-plugin-mock'

// 模拟刷新token接口
export default [
  {
    url: '/refreshToken',
    method: 'post',
    response: ({ body }) => {
      if (body.refreshToken) {
        return {
          code: 200,
          messgae: 'Token刷新成功',
          data: {
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.newAdmin',
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.newAdminRefresh',
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
      if (headers.authorization === 'eyJhbGciOiJIUzUxMiJ9.newAdmin') {
        return { code: 200, messgae: '', data: {} }
      }
      return { code: 401, messgae: 'token过期', data: {} }
    }
  }
] as MockMethod[]
