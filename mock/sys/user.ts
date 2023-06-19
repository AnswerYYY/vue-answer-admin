import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: ({ body }) => {
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
          roles: body.username === 'admin' ? ['admin', 'common'] : ['admin', 'common']
        }
      }
    }
  }
] as MockMethod[]
