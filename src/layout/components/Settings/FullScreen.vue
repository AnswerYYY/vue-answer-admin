<template>
  <el-icon size="24" @click="toggle" :color="isFullscreen ? 'red' : '#000'">
    <FullScreen />
  </el-icon>
</template>

<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core'

  const { toggle, isFullscreen } = useFullscreen()
</script>
<style lang="scss" scoped></style>
