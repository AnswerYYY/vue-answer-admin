import { nextTick } from 'vue'
import { useTabsStoreHook } from '@/store/modules/tabs'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { useKeepAliveStoreHook } from '@/store/modules/keepAlive'
import { useSettingStoreHook } from '@/store/modules/settings'
import mittBus from '@/utils/mittBus'

const tabsStore = useTabsStoreHook()
const keepAliveStore = useKeepAliveStoreHook()
const useTabs = (route: RouteLocationNormalizedLoaded, router: Router) => {
  const refresh = () => {
    setTimeout(() => {
      keepAliveStore.removeName(route.name as string)
      mittBus.emit('refreshPage', true)
      nextTick(() => {
        if (route.meta.keepAlive || useSettingStoreHook().allKeepAlive) {
          keepAliveStore.addName(route.name as string)
        }
        mittBus.emit('refreshPage', false)
      })
    }, 0)
  }
  const closeCurrent = () => {
    if (route.meta.isAffix) return
    tabsStore.removeTab(route.fullPath)
    keepAliveStore.removeName(route.name as string)
  }
  const closeOther = () => {
    tabsStore.closMultiple(route.fullPath)
    keepAliveStore.setKeepAliveNames([route.name] as string[])
  }

  const closeAll = () => {
    tabsStore.closMultiple()
    keepAliveStore.setKeepAliveNames()
    router.push('/')
  }
  return {
    refresh,
    closeCurrent,
    closeOther,
    closeAll
  }
}
export default useTabs
