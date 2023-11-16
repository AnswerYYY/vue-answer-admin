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
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <Icon
              v-show="item.icon && settingsStore.tabsIcon"
              class="tabs-icon mr-1"
              :name="item.icon"
            />
            {{ item.title }}
          </template>
        </el-tab-pane>
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
  import { Icon } from '@/components'
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
      tabsctivePath.value = route.fullPath
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
    tabsStore.removeTab(fullPath as string, fullPath === route.fullPath)
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
      :deep(.el-tabs) {
        .el-tabs__header {
          box-sizing: border-box;
          height: 40px;
          padding: 0 10px;
          margin: 0;
          .el-tabs__nav-wrap {
            position: absolute;
            width: calc(100% - 48px);
            .el-tabs__nav {
              display: flex;
              border: none;
              .el-tabs__item {
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--el-text-color-secondary);
                border: none;
                .tabs-icon {
                  margin: 1.5px 4px 0 0;
                  font-size: 15px;
                }
                .is-icon-close {
                  margin-top: 1px;
                }
                &.is-active {
                  color: var(--el-color-primary);
                  &::before {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 0;
                    content: '';
                    border-bottom: 2px solid var(--el-color-primary) !important;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
