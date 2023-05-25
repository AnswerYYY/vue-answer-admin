<template>
  <el-container class="layout">
    <Sidebar />
    <el-container direction="vertical">
      <NavigationBar />
      <AppMain />
      <Footer />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import { AppMain, NavigationBar, Sidebar, Footer } from './components'
</script>
<style lang="scss" scoped>
  .layout {
    width: 100vw;
    height: 100vh;
  }
</style>
