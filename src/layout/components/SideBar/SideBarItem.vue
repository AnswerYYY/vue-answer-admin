<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu v-if="menu.children?.length && menu.children?.length >= 1" :index="menu.path">
      <template #title>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <SideBarItem :menus="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" :key="menu.path">{{ menu.meta?.title }}</el-menu-item>
  </template>
</template>

<script lang="ts" setup>
  defineProps<{ menus: any[] }>()
</script>
<style lang="scss" scoped></style>
