<template>
  <div class="header-left">
    <Collapse />
    <Breadcrumb v-if="useSettingStoreHook().breadcrumb" />
  </div>
</template>

<script lang="ts" setup>
  import Collapse from './components/collapse.vue'
  import Breadcrumb from './components/breadcrumb.vue'
  import { useSettingStoreHook } from '@/store/modules/settings'
</script>
<style lang="scss" scoped>
  .header-left {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
