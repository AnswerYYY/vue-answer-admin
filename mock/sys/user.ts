import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: '请求成功！',
        data: {
          name: '@cname',
          age: '@integer(10-100)',
          uid: '@id',
          url: '@image',
          city: '@city',
          country: '@county(true)',
          province: '@province',
          mobile_phone: '@phone',
          email: '@email',
          region: '@region',
          roles: ['admin', 'common']
        }
      }
    }
  },
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
