<template>
  <div class="tabs-wrapper">
    <div class="tabs-menu">
      <el-tabs
        v-model="tabsctivePath"
        type="card"
        tab-position="top"
        @tab-click="handleTabClick"
        @tab-remove="handleTabRemove"
      >
        <el-tab-pane
          v-for="item in tabsList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        />
      </el-tabs>
      <moreButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import moreButton from './components/moreButton.vue'
  import { ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useTabsStoreHook } from '@/store/modules/tabs'
  import { useKeepAliveStoreHook } from '@/store/modules/keepAlive'
  import { usePermissionStoreHook } from '@/store/modules/permission'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { treeConvertToArr } from '@/router/utils'
  import { computed } from 'vue'
  import { watch } from 'vue'
  import { tabsMenuProps } from '@/store/modules/types'
  import { onMounted } from 'vue'
  import { TabPaneName, TabsPaneContext } from 'element-plus'
  const route = useRoute()
  const router = useRouter()
  const tabsStore = useTabsStoreHook()
  const permissionStore = usePermissionStoreHook()
  const keepAliveStore = useKeepAliveStoreHook()
  const settingsStore = useSettingStoreHook()

  const tabsctivePath = ref(route.fullPath)
  const tabsList = computed(() => tabsStore.tabsList)

  onMounted(() => {
    initTabs()
  })

  watch(
    () => route.path,
    () => {
      tabsctivePath.value = route.path
      const params: tabsMenuProps = {
        icon: route.meta.icon as string,
        title: route.meta.title,
        path: route.fullPath,
        name: route.name as string,
        close: !route.meta.isAffix
      }
      tabsStore.addTab(params)
      if (route.meta.keepAlive || settingsStore.allKeepAlive) {
        keepAliveStore.addName(route.name as string)
      }
    },
    {
      immediate: true
    }
  )

  //   初始化
  const initTabs = () => {
    treeConvertToArr(permissionStore.completeMenus).forEach((e) => {
      if (e.meta?.isAffix && !e.meta.hidden) {
        const params: tabsMenuProps = {
          icon: e.meta.icon as string,
          title: e.meta.title,
          path: e.path,
          name: e.name as string,
          close: !e.meta.isAffix
        }
        tabsStore.addTab(params)
      }
    })
  }
  const handleTabClick = (item: TabsPaneContext) => {
    const fullPath = item.props.name as string
    router.push(fullPath)
  }
  const handleTabRemove = (fullPath: TabPaneName) => {
    const name = tabsStore.tabsList.filter((item) => item.path === fullPath)[0].name || ''
    keepAliveStore.removeName(name)
    tabsStore.removeTab(fullPath as string, fullPath === route.path)
  }
</script>
<style lang="scss" scoped>
  .tabs-wrapper {
    background-color: var(--el-bg-color);
    .tabs-menu {
      position: relative;
      width: 100%;
      .el-dropdown {
        position: absolute;
        top: 8px;
        right: 13px;
      }
    }
  }
</style>
