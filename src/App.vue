<template>
  <el-config-provider
    :locale="zhCn"
    :size="useSettingStoreHook().assemblySize"
    :button="buttonConfig"
  >
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
  import useTheme from '@/hooks/useTheme'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import { reactive } from 'vue'
  import { useSettingStoreHook } from './store/modules/settings'

  // 主题初始化
  const { initTheme } = useTheme()
  initTheme()

  // element button config
  const buttonConfig = reactive({
    autoInsertSpace: true
  })
</script>

<style scoped></style>
