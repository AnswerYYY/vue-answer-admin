import { http } from '@/utils/http'

export type LoginResult = ApiResponseData<{
  /** `token` */
  accessToken: string
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date
}>

export const getUserInfo = () => {
  return http.request<ApiResponseData<any>>({
    method: 'get',
    url: '/api/getUserInfo'
  })
}

/** 登录 */
export const userLogin = (data: object) => {
  return http.request<LoginResult>({
    method: 'post',
    url: '/login',
    data
  })
}
