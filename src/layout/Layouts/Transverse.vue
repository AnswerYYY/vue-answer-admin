<template>
  <!-- 横向布局 -->
  <el-container class="layout">
    <el-header>
      <SubLogo />
      <el-menu
        mode="horizontal"
        router
        :collapse="isCollapse"
        :default-active="activeMenu"
        :unique-opened="true"
        :collapse-transition="false"
      >
        <template v-for="menu in menus" :key="menu.path">
          <el-sub-menu
            v-if="menu.children?.length && menu.children?.length >= 1"
            :index="menu.path"
          >
            <template #title>
              <Icon :name="menu.meta?.icon" size="20" />
              <span>{{ menu.meta?.title }}</span>
            </template>
            <SubMenu :menus="menu.children" />
          </el-sub-menu>
          <el-menu-item v-else :index="menu.path" :key="menu.path">
            <Icon :name="menu.meta?.icon" size="20" />
            <template #title>
              {{ menu.meta?.title }}
            </template>
          </el-menu-item>
        </template>
      </el-menu>
      <HeaderRight />
    </el-header>

    <AppMain />
  </el-container>
</template>

<script lang="ts" setup>
  import { AppMain, SubLogo, HeaderRight, SubMenu } from '../components'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { storeToRefs } from 'pinia'
  import { usePermissionStoreHook } from '@/store/modules/permission'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { Icon } from '@/components'
  const { isCollapse } = storeToRefs(useSettingStoreHook())
  const menus = usePermissionStoreHook().completeMenus.map((e) => {
    // 子菜单为一项不显示层级
    if (e.children && e.children.length === 1 && !e.meta?.alwaysShow) {
      return e.children[0]
    }
    return e
  })
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
      border-bottom: 1px solid var(--el-border-color-light);
      .icon {
        color: #e5eaf3 !important;
      }
      .logo {
        width: 210px;
        margin-right: 30px;
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
      .el-menu {
        flex: 1;
        height: 100%;
        overflow: hidden;
        border-bottom: none;
        margin-left: 20px;
        .el-sub-menu__hide-arrow {
          width: 65px;
          height: 55px;
        }
        .el-sub-menu .el-sub-menu__title:hover {
          color: var(--el-menu-hover-text-color) !important;
          background-color: transparent !important;
        }
        .is-active {
          background-color: var(--el-color-primary) !important;
          border-bottom-color: var(--el-color-primary) !important;
          &::before {
            width: 0;
          }
          .el-sub-menu__title {
            background-color: var(--el-color-primary) !important;
            border-bottom-color: var(--el-color-primary) !important;
          }
        }
      }
    }
  }
</style>
