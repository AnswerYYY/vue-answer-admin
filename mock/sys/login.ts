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
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.Admin',
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.AdminRefresh',
            expires: '2023/10/30 00:00:00'
          }
        }
      } else {
        return {
          code: 200,
          message: '请求成功',
          data: {
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.Common',
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.CommonRefresh',
            expires: '2023/10/30 00:00:00'
          }
        }
      }
    }
  }
] as MockMethod[]
