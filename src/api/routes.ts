import { http } from '@/utils/http'
export type routesResult = ApiResponseData<any[]>

export const getAsyncRoutes = () => {
  return http.request<routesResult>({
    method: 'get',
    url: '/api/getAsyncRoutes'
  })
}
