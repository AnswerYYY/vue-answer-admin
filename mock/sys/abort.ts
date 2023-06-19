import { MockMethod } from 'vite-plugin-mock'

// 模拟取消接口
export default [
  {
    url: '/api/abortRequest',
    method: 'get',
    timeout: 2000,
    response: () => {
      return { code: 200, data: {}, message: '响应成功' }
    }
  }
] as MockMethod[]
