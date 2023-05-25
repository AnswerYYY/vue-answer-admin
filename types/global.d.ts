type Recordable<T = any> = Record<string, T>

/**
 * @description 扩展环境变量
 */
interface ViteEnv {
  /** 运行端口 */
  VITE_PORT: number
  /** 使用MOCK */
  VITE_USE_MOCK: boolean
  /** 系统标题 */
  VITE_GLOB_APP_TITLE: string
  /** 默认路径 */
  VITE_BASE_URL: string
  /** 路由模式 */
  VITE_ROUTER_HISTORY: string
}
interface ApiResponseData<T> {
  code: number
  message: string
  data: T
}
