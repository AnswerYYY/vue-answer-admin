import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  noAuth?: Boolean //是否携带token信息
  noError?: Boolean //是否显示拦截器错误信息
}

export interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  noAuth?: Boolean //是否携带token信息
  noError?: Boolean //是否显示拦截器错误信息
}
