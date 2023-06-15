<template>
  <Icon
    size="26"
    :name="`iconfont icon-${isFullscreen ? 'quxiaoquanping' : 'quanping'}`"
    @click="toggle"
  />
</template>

<script lang="ts" setup>
  import { Icon } from '@/components'
  import { useFullscreen } from '@vueuse/core'

  const { toggle, isFullscreen } = useFullscreen()
</script>
<style lang="scss" scoped></style>
