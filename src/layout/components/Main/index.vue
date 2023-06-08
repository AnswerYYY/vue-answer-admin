<template>
  <el-main>
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-if="footer">
    <Footer />
  </el-footer>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import Footer from '../Footer/index.vue'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { storeToRefs } from 'pinia'
  const { footer } = storeToRefs(useSettingStoreHook())
  const route = useRoute()
</script>
<style lang="scss" scoped>
  .el-main {
    box-sizing: border-box;
    padding: 10px 12px;
    overflow-x: hidden;
    background-color: var(--el-bg-color-page);
  }
</style>
