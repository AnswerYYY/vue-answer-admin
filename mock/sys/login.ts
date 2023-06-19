import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'admin') {
        return {
          code: 200,
          message: '请求成功',
          data: {
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.admin',
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.adminRefresh',
            expires: '2023/10/30 00:00:00'
          }
        }
      } else {
        return {
          code: 200,
          message: '请求成功',
          data: {
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.common',
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.commonRefresh',
            expires: '2023/10/30 00:00:00'
          }
        }
      }
    }
  }
] as MockMethod[]
