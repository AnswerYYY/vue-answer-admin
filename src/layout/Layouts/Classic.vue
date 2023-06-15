<template>
  <!-- 经典布局 -->
  <el-container class="layout">
    <el-header>
      <div class="header-left">
        <SubLogo />
        <HeaderLeft />
      </div>
      <div class="header-right">
        <HeaderRight />
      </div>
    </el-header>
    <el-container class="classic-content">
      <el-aside>
        <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
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
        <AppMain />
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import { AppMain, SubLogo, HeaderLeft, HeaderRight, SubMenu } from '../components'
  import { useSettingStoreHook } from '@/store/modules/settings'
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
    :deep(.el-header) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 55px;
      padding: 0 15px 0 0;
      background-color: #191a20;
      border-bottom: 1px solid #414243;
      .icon {
        color: #e5eaf3 !important;
      }
      .header-left {
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        .logo {
          flex-shrink: 0;
          width: 210px;
          margin-right: 16px;
          .logo-img {
            width: 28px;
            object-fit: contain;
            margin-right: 6px;
          }
          .logo-text {
            font-size: 21.5px;
            font-weight: bold;
            color: #dadada;
            white-space: nowrap;
          }
        }
        .el-breadcrumb__inner.is-link {
          color: #e5eaf3;
          &:hover {
            color: var(--el-color-primary) !important;
          }
        }
        .el-breadcrumb__item:last-child .el-breadcrumb__inner,
        .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
          color: #cfd3dc;
        }
      }
      .header-right {
        .name {
          color: #e5eaf3;
        }
      }
    }
    .classic-content {
      display: flex;
      height: calc(100% - 55px);
      :deep(.el-aside) {
        width: auto;
        background-color: var(--el-menu-bg-color);
        border-right: 1px solid var(--el-border-color-light);
        .aside-box {
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: width 0.3s ease;
          .el-menu {
            width: 100%;
            overflow-x: hidden;
            border-right: none;
          }
        }
      }
    }
  }
</style>
