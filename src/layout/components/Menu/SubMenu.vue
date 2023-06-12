<template>
  <template v-for="menu in formattMenus" :key="menu.path">
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
  import { computed } from 'vue'
  import lodash from 'lodash'
  const props = defineProps<{ menus: any[] }>()
  const formattMenus = computed(() => {
    const menus = lodash.cloneDeep(props.menus)
    return menus.map((e) => {
      // 子菜单为一项不显示层级
      if (e.children && e.children.length === 1) {
        return e.children[0]
      }
      return e
    })
  })
</script>
<style lang="scss" scoped></style>
