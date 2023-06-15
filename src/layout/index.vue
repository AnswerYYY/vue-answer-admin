<template>
  <component :is="LayoutComponents[useSettingStoreHook().layout]" />
  <ThemeSettings />
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'LayoutIndex'
  })
  import { type Component } from 'vue'
  import { LayoutVertical, LayoutClassic, LayoutTransverse, LayoutColumns } from './Layouts'
  import { LayoutType } from '@/config'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import ThemeSettings from './components/Settings/index.vue'
  const LayoutComponents: Record<LayoutType, Component> = {
    vertical: LayoutVertical,
    classic: LayoutClassic,
    transverse: LayoutTransverse,
    columns: LayoutColumns
  }
</script>
<style lang="scss" scoped>
  .layout {
    min-width: 730px;
  }
</style>
