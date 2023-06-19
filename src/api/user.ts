import { http } from '@/utils/http'

export type LoginResult = ApiResponseData<{
  /** `token` */
  accessToken: string
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expires: Date
}>

export const userUrl = {
  getUserInfo: '/api/getUserInfo',
  login: '/login',
  refreshToken: '/refreshToken',
  expireToken: '/expireToken'
}

export const getUserInfo = () => {
  return http.get<ApiResponseData<any>>(userUrl.getUserInfo)
}

export const userExpireToken = () => {
  return http.get<ApiResponseData<any>>(userUrl.expireToken)
}

/** 登录 */
export const userLogin = (data: object) => {
  return http.post<LoginResult>(userUrl.login, data, {
    noAuth: true
  })
}
export const userRefreshToken = (data: { refreshToken: string }) => {
  return http.post<LoginResult>(userUrl.refreshToken, data, {
    noError: true
  })
}
