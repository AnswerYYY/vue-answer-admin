import { http } from '@/utils/http'

export const systemUrl = {
  abortRequest: '/api/abortRequest'
}

export const getAbortRequest = (params: any) => {
  return http.get<ApiResponseData<any>>(systemUrl.abortRequest, params, {
    noError: true
  })
}
