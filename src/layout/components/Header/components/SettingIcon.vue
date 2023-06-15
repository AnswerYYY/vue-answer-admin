<template>
  <Icon size="28" name="iconfont icon-quanjushezhi" @click="handleOpenSettings" />
</template>

<script lang="ts" setup>
  import mittBus from '@/utils/mittBus'
  import { Icon } from '@/components'
  const handleOpenSettings = () => {
    mittBus.emit('openSettingDrawer', true)
  }
</script>
<style lang="scss" scoped></style>
