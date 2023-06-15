<template>
  <div class="logo flex items-center justify-center">
    <el-image class="logo-img" src="/vite.svg" fit="contain" />
    <span v-show="showTitle" class="logo-text">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
  interface props {
    showTitle: boolean
  }
  const props = withDefaults(defineProps<props>(), {
    showTitle: true
  })
  const title = import.meta.env.VITE_GLOB_APP_TITLE
</script>
<style lang="scss" scoped>
  .logo {
    .logo-img {
      width: 28px;
      margin-right: 6px;
    }
    .logo-text {
      font-size: 20px;
      font-weight: bold;
      white-space: nowrap;
    }
  }
</style>
