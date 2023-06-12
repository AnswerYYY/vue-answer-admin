import { RouteRecordRaw } from 'vue-router'

/** PermissionState **/
export interface PermissionState {
  constantMenus: RouteRecordRaw[]
  addRouters: RouteRecordRaw[]
  completeMenus: RouteRecordRaw[]
}

/** UserState **/
export interface UserState {
  token: String
  refreshToken: String
  roles: Array<String>
  info: object
}

/** tabsMenuProps **/
export interface tabsMenuProps {
  icon: string
  title: string
  path: string
  name: string
  close: boolean
}

/** tabsState **/
export interface tabsState {
  tabsList: tabsMenuProps[]
}

/* KeepAliveState */
export interface KeepAliveState {
  keepAliveNames: string[]
}
