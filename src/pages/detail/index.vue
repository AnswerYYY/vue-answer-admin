<template>
  <div class="card-wrapper">
    <p>这是一个详情页</p>
    <el-alert :title="`当前页面：${route.fullPath}`" type="success" :closable="false" />
    <el-input v-model="input" placeholder="测试缓存" clearable />
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { ref } from 'vue'
  import { useTabsStoreHook } from '@/store/modules/tabs'
  defineOptions({
    name: 'Detail'
  })
  const input = ref<string>('')
  const route = useRoute()
  useTabsStoreHook().setTabTitle(`${route.meta.title}${route.query.id}`)
</script>

<style scoped></style>
