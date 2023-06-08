<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu v-if="menu.children?.length && menu.children?.length >= 1" :index="menu.path">
      <template #title>
        <el-icon color="#fff">
          <Menu />
        </el-icon>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <SubMenu :menus="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path" :key="menu.path">
      <el-icon color="#fff"> <Menu /> </el-icon>
      <template #title>
        {{ menu.meta?.title }}
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
  defineProps<{ menus: any[] }>()
</script>
<style lang="scss" scoped></style>
