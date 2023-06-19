import { http } from '@/utils/http'
export type routesResult = ApiResponseData<any[]>

export const routesUrl = {
  getAsyncRoutes: '/api/getAsyncRoutes'
}

export const getAsyncRoutes = () => {
  return http.get<routesResult>(routesUrl.getAsyncRoutes)
}
