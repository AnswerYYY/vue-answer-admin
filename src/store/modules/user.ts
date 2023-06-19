import { store } from '@/store'
import { defineStore } from 'pinia'
import { LoginResult, getUserInfo, userLogin, userRefreshToken } from '@/api/user'
import { UserState } from './types'
import piniaPersistConfig from '@/config/piniaPersist'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    refreshToken: '',
    // 页面级别权限
    roles: [],
    info: {}
  }),
  getters: {
    GET_ROLES(): UserState['roles'] {
      return this.roles
    }
  },
  actions: {
    SET_ROLES(roles: Array<string>) {
      this.roles = roles
    },
    SET_TOKEN(token: string, refreshToken: string) {
      this.token = token
      this.refreshToken = refreshToken
    },
    SET_INFO(info: object) {
      this.info = info
    },
    // 登录
    async login(data: { username: string; password: string }) {
      return new Promise<LoginResult>((resolve, reject) => {
        userLogin(data)
          .then((res) => {
            const {
              data: { accessToken, refreshToken }
            } = res
            this.SET_TOKEN(accessToken, refreshToken)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    async getInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const {
              data: { roles }
            } = res
            this.SET_INFO(res.data)
            this.SET_ROLES(roles)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    refreshTokenApi() {
      return new Promise<LoginResult>((resolve, reject) => {
        userRefreshToken({
          refreshToken: this.refreshToken as string
        })
          .then((res) => {
            if (res.code === 200) {
              const {
                data: { accessToken, refreshToken }
              } = res
              this.SET_TOKEN(accessToken, refreshToken)
              resolve(res)
            } else {
              reject(res.message)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    removeToken() {
      this.token = ''
      this.refreshToken = ''
    },
    // 登出
    logOut() {
      this.removeToken()
      this.roles = []
      this.info = {}
      return Promise.resolve()
    }
  },
  persist: piniaPersistConfig('user-info', ['token', 'refreshToken'])
})

export function useUserStoreHook() {
  return useUserStore(store)
}
