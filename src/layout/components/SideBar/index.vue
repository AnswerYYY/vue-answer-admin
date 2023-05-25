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
        <template v-for="menu in menus" :key="menu.path">
          <el-sub-menu v-if="menu.children && menu.children.length > 1" :index="menu.path">
            <template #title>
              <span>{{ menu.meta?.title }}</span>
            </template>
            <el-menu-item v-for="item in menu.children" :index="item.path" :key="item.path">{{
              item.meta?.title
            }}</el-menu-item>
          </el-sub-menu>
          <el-menu-item
            v-else-if="menu.children && menu.children.length === 1"
            :index="menu.children[0].path"
            :key="menu.children[0].path"
            >{{ menu.children[0].meta?.title }}</el-menu-item
          >
          <el-menu-item v-else :index="menu.path" :key="menu.path">{{
            menu.meta?.title
          }}</el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
  import { usePermissionStoreHook } from '@/store/modules/permission'
  import { filterHiddenRouter } from '@/router/utils'
  import { useRoute } from 'vue-router'
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
