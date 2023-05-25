import { AxiosRequestConfig } from 'axios'
export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: {
    auth?: Boolean //是否携带token信息
    error?: Boolean //是否显示拦截器错误信息
  }
}
