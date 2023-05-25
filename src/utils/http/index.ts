import Axios, { AxiosInstance } from 'axios'
import { CreateAxiosOptions } from './types'
import { merge } from 'lodash'
const defaultOptions: CreateAxiosOptions = {
  timeout: 30000,
  baseURL: import.meta.env.VITE_BASE_URL
}
class Ahttp {
  /** token过期后，暂存待执行的请求 */
  private static requests = []
  /** 防止重复刷新token */
  private static isRefreshing = false
  private readonly options: CreateAxiosOptions
  /** 保存当前Axios实例对象 */
  private axiosInstance: AxiosInstance
  constructor(opt?: CreateAxiosOptions) {
    // 深度合并
    this.options = merge(defaultOptions, opt)
    this.axiosInstance = Axios.create(this.options)
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  private httpInterceptorsRequest() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
  private httpInterceptorsResponse() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
  public request<T>(config: CreateAxiosOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<T, any>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export const http = new Ahttp()
