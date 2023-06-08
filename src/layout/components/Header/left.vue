<template>
  <div class="header-left">
    <el-icon size="24" @click="useSettingStoreHook().setSettings('isCollapse', !isCollapse)">
      <Expand v-if="isCollapse" />
      <Fold v-else />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { storeToRefs } from 'pinia'
  const { isCollapse } = storeToRefs(useSettingStoreHook())
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
