import Axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { CustomAxiosRequestConfig, CustomInternalAxiosRequestConfig } from './types'
import { merge, get } from 'lodash'
import { useUserStoreHook } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { statusCode } from '@/enum/httpEnum'
import { converToUrl } from '../util'
import router from '@/router'
import { loginPath } from '@/config'
const defaultOptions: CustomAxiosRequestConfig = {
  timeout: 30000,
  baseURL: import.meta.env.VITE_BASE_URL
}
class Ahttp {
  /** token过期后，暂存待执行的请求 */
  private requests: Array<(token: string) => void> = []
  /** 防止重复刷新token */
  private isRefreshing = false
  /** 取消请求列表 */
  private abortControllerMap: Map<string, AbortController>
  private readonly options: CustomAxiosRequestConfig
  /** 保存当前Axios实例对象 */
  private axiosInstance: AxiosInstance
  constructor(opt?: CustomAxiosRequestConfig) {
    this.abortControllerMap = new Map()
    /* 深度合并 */
    this.options = merge(defaultOptions, opt)
    this.axiosInstance = Axios.create(this.options)
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  private httpInterceptorsRequest() {
    this.axiosInstance.interceptors.request.use(
      (config: CustomInternalAxiosRequestConfig) => {
        const { noAuth } = config
        const useUserStore = useUserStoreHook()
        let url = config.url || ''
        /* 取消请求控制器 */
        const controller = new AbortController()
        config.signal = controller.signal
        /* Get请求取完整路径 */
        if (config.method?.toLocaleUpperCase() === 'GET' && url) {
          url += converToUrl(config?.params || {})
        }
        this.abortControllerMap.set(url, controller)
        /* 设置token */
        if (useUserStore.token && !noAuth) {
          config.headers.Authorization = useUserStore.token as string
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
  private httpInterceptorsResponse() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, status } = response
        const config = response.config as CustomInternalAxiosRequestConfig
        const useUserStore = useUserStoreHook()
        this.abortControllerMap.delete(config.url || '')
        if (status === 200) {
          if (data.code === 401) {
            if (!this.isRefreshing) {
              this.isRefreshing = true
              /* 刷新token */
              return useUserStoreHook()
                .refreshTokenApi()
                .then((res) => {
                  config.headers.Authorization = res.data.accessToken
                  /* 重新发起请求队列 */
                  this.requests.forEach((cb) => cb(res.data.accessToken))
                  /* 清空队列 */
                  this.requests = []
                  /* 重新发起401错误的请求 */
                  return this.request(config)
                })
                .catch(() => {
                  this.requests = []
                  ElMessage.error('用户登录超时，请重新登录！')
                  useUserStore.logOut().then(() => {
                    this.cancelRequest()
                    router.push(loginPath)
                  })
                })
                .finally(() => {
                  this.isRefreshing = false
                })
            } else {
              /* 刷新Token中，加入队列 */
              return new Promise((resolve) => {
                this.requests.push((token) => {
                  config.headers.Authorization = token
                  resolve(this.request(config))
                })
              })
            }
          } else if (data.code && data.code !== 200) {
            if (!config.noError) {
              ElMessage.error(data.message)
            }
            return Promise.reject(data.message)
          }
        }
        return data
      },
      (error: AxiosError) => {
        const config = error.config as CustomInternalAxiosRequestConfig
        const errorMsg = get(statusCode, 'response.status') || `请求错误：${error.message}`
        if (!config?.noError && error.name !== 'CanceledError') {
          ElMessage.error(errorMsg)
        }
        return Promise.reject(error)
      }
    )
  }
  // 取消请求
  public cancelRequest(url?: string | string[]) {
    if (!url) {
      this.abortControllerMap.forEach((controller) => {
        controller.abort()
      })
      this.abortControllerMap.clear()
    } else {
      const urlList = Array.isArray(url) ? url : [url]
      urlList.forEach((_url) => {
        if (this.abortControllerMap.has(_url)) {
          this.abortControllerMap.get(_url)!.abort()
          this.abortControllerMap.delete(_url)
        }
      })
    }
  }
  public request<T>(config: CustomAxiosRequestConfig): Promise<T> {
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
  public get<T>(url: string, params?: object, config?: CustomAxiosRequestConfig) {
    return this.request<T>({
      url,
      method: 'get',
      params,
      ...config
    })
  }
  public post<T>(url: string, data?: object, config?: CustomAxiosRequestConfig) {
    return this.request<T>({
      url,
      method: 'post',
      data,
      ...config
    })
  }
}

export const http = new Ahttp()
