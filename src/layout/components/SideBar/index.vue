<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-menu
        router
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="useRoute().path"
        text-color="#fff"
      >
        <SideBarItem :menus="menus" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
  import { usePermissionStoreHook } from '@/store/modules/permission'
  import { filterHiddenRouter } from '@/router/utils'
  import { useRoute } from 'vue-router'
  import SideBarItem from './SideBarItem.vue'
  const menus = filterHiddenRouter(usePermissionStoreHook().completeMenus)
</script>
<style lang="scss" scoped>
  .el-scrollbar {
    height: 100vh;
    :deep(.scrollbar-wrapper) {
      // 限制水平宽度
      overflow-x: hidden !important;
      .el-scrollbar__view {
        height: 100vh;
      }
    }
    // 滚动条
    :deep(.el-scrollbar__bar) {
      &.is-horizontal {
        // 隐藏水平滚动条
        display: none;
      }
    }
  }

  .el-menu {
    border: none;
    min-height: 100vh;
    width: 100% !important;
  }
</style>
