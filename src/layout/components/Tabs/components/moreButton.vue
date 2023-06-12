<template>
  <el-dropdown trigger="click" :teleported="false">
    <el-button type="primary" size="small">
      <span>更多</span>
      <Icon name="el-icon-arrow-down" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="Refresh" @click="handleRefresh">
          <span>刷新</span>
        </el-dropdown-item>
        <el-dropdown-item icon="Remove" @click="handleCloseCurrent">
          <span>关闭当前</span>
        </el-dropdown-item>
        <el-dropdown-item icon="CircleClose" @click="handleCloseOther">
          <span>关闭其它</span>
        </el-dropdown-item>
        <el-dropdown-item icon="FolderDelete" @click="hanleCloseAll">
          <span>关闭全部</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
  import { inject, nextTick } from 'vue'
  import { Icon } from '@/components'
  import { useTabsStoreHook } from '@/store/modules/tabs'
  import { useRoute, useRouter } from 'vue-router'
  import { useKeepAliveStoreHook } from '@/store/modules/keepAlive'
  import { useSettingStoreHook } from '@/store/modules/settings'
  const route = useRoute()
  const router = useRouter()
  const tabsStore = useTabsStoreHook()
  const keepAliveStore = useKeepAliveStoreHook()
  const refreshPage = inject('refreshPage') as Function
  const handleRefresh = () => {
    setTimeout(() => {
      keepAliveStore.removeName(route.name as string)
      refreshPage(true)
      nextTick(() => {
        if (route.meta.keepAlive || useSettingStoreHook().allKeepAlive) {
          keepAliveStore.addName(route.name as string)
        }
        refreshPage(false)
      })
    }, 0)
  }
  const handleCloseCurrent = () => {
    if (route.meta.isAffix) return
    tabsStore.removeTab(route.fullPath)
    keepAliveStore.removeName(route.name as string)
  }
  const handleCloseOther = () => {
    tabsStore.closMultiple(route.fullPath)
    keepAliveStore.setKeepAliveNames([route.name] as string[])
  }
  const hanleCloseAll = () => {
    tabsStore.closMultiple()
    keepAliveStore.setKeepAliveNames()
    router.push('/')
  }
</script>
<style lang="scss" scoped></style>
