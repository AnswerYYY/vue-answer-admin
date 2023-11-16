<template>
  <template v-for="menu in formattMenus" :key="menu.path">
    <el-sub-menu v-if="menu.children?.length && menu.children?.length >= 1" :index="menu.path">
      <template #title>
        <Icon v-if="menu.meta?.icon" :name="menu.meta.icon" size="20" />
        <span>{{ menu.meta?.title }}</span>
      </template>
      <SubMenu :menus="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" :key="menu.path">
      <Icon v-if="menu.meta?.icon" :name="menu.meta.icon" size="20" />
      <template #title>
        {{ menu.meta?.title }}
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
  import { Icon } from '@/components'
  import { computed } from 'vue'
  import lodash from 'lodash'
  import { RouteRecordRaw } from 'vue-router'
  const props = defineProps<{ menus: RouteRecordRaw[] }>()
  const formattMenus = computed(() => {
    const menus = lodash.cloneDeep(props.menus)
    return menus.map((e) => {
      // 子菜单为一项不显示层级
      if (e.children && e.children.length === 1 && !e.meta?.alwaysShow) {
        return e.children[0]
      }
      return e
    })
  })
</script>
<style lang="scss">
  .el-menu--collapse {
    .is-active {
      .el-sub-menu__title {
        color: #ffffff !important;
        background-color: var(--el-color-primary) !important;
      }
    }
  }
  .el-menu-item {
    &:hover {
      color: var(--el-menu-hover-text-color);
    }
    &.is-active {
      color: var(--el-menu-active-color) !important;
      background-color: var(--el-menu-active-bg-color) !important;
      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 4px;
        content: '';
        background-color: var(--el-color-primary);
      }
    }
  }
  .classic,
  .vertical,
  .transverse {
    .el-menu-item {
      &.is-active {
        &::before {
          left: 0;
        }
      }
    }
  }
  .columns {
    .el-menu-item {
      &.is-active {
        &::before {
          right: 0;
        }
      }
    }
  }
</style>
