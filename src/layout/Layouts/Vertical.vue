<template>
  <!-- 纵向布局 -->
  <el-container class="layout">
    <el-aside>
      <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
        <SubLogo :show-title="!isCollapse" />
        <el-scrollbar>
          <el-menu
            router
            :collapse="isCollapse"
            :default-active="activeMenu"
            :unique-opened="true"
            :collapse-transition="false"
          >
            <SubMenu :menus="menus" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container direction="vertical">
      <el-header>
        <HeaderLeft />
        <HeaderRight />
      </el-header>
      <AppMain />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { AppMain, SubLogo, HeaderLeft, HeaderRight, SubMenu } from '../components'
  import { storeToRefs } from 'pinia'
  import { usePermissionStoreHook } from '@/store/modules/permission'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  const { isCollapse } = storeToRefs(useSettingStoreHook())
  const menus = usePermissionStoreHook().completeMenus
  const route = useRoute()
  const activeMenu = computed(
    () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
  )
</script>
<style lang="scss" scoped>
  .layout {
    width: 100vw;
    height: 100vh;
    :deep(.el-aside) {
      width: auto;
      background-color: var(--el-menu-bg-color);
      border-right: 1px solid var(--el-border-color-light);
      .aside-box {
        display: flex;
        flex-direction: column;
        height: 100%;
        transition: width 0.3s ease;
        .el-scrollbar {
          height: calc(100% - 55px);
          .el-menu {
            width: 100%;
            overflow-x: hidden;
            border-right: none;
          }
        }
        .logo {
          box-sizing: border-box;
          height: 55px;
          .logo-text {
            color: var(--el-logo-text-color);
          }
        }
      }
    }
    .el-header {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 55px;
      padding: 0 15px;
      background-color: var(--el-bg-color);
      border-bottom: 1px solid var(--el-border-color-light);
    }
  }
</style>
