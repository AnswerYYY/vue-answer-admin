<template>
  <div class="footer flex justify-center items-center">
    <a href="https://github.com/HalseySpicy" target="_blank"> 2023 © {{ title }} By Answer™ </a>
  </div>
</template>

<script lang="ts" setup>
  const title = import.meta.env.VITE_GLOB_APP_TITLE.split(' ').join('-')
</script>
<style lang="scss" scoped>
  .footer {
    height: 30px;
    background-color: var(--el-bg-color);
    border-top: 1px solid var(--el-border-color-light);
    a {
      font-size: 14px;
      color: var(--el-text-color-secondary);
      text-decoration: none;
      letter-spacing: 0.5px;
    }
  }
</style>
