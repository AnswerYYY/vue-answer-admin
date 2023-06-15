<template>
  <Icon
    class="mr-4 cursor-pointer"
    size="24"
    :name="isCollapse ? 'el-icon-Expand' : 'el-icon-Fold'"
    @click="useSettingStoreHook().setSettings('isCollapse', !isCollapse)"
  />
</template>

<script lang="ts" setup>
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { storeToRefs } from 'pinia'
  const { isCollapse } = storeToRefs(useSettingStoreHook())
  import { Icon } from '@/components'
</script>
<style lang="scss" scoped></style>
