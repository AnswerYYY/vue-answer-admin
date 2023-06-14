<template>
  <!-- 经典布局 -->
  <el-container class="layout">
    <el-header>
      <div class="header-left">
        <SubLogo />
        <HeaderLeft />
      </div>
      <div class="header-right">
        <HeaderRight />
      </div>
    </el-header>
    <el-container direction="vertical">
      <Header />
      <AppMain />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import { AppMain, SubLogo, HeaderLeft, HeaderRight } from '../components'
</script>
<style lang="scss" scoped>
  .layout {
    width: 100vw;
    height: 100vh;
    :deep(.el-header) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 55px;
      padding: 0 15px 0 0;
      background-color: #191a20;
      border-bottom: 1px solid #414243;
      .header-left {
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        .logo {
          flex-shrink: 0;
          width: 210px;
          margin-right: 16px;
          .logo-img {
            width: 28px;
            object-fit: contain;
            margin-right: 6px;
          }
          .logo-text {
            font-size: 21.5px;
            font-weight: bold;
            color: #dadada;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
