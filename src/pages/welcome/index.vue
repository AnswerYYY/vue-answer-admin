<template>
  <div>
    <div>首页</div>
    <el-button type="" @click="router.push('/system/user/index')">user</el-button>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()
  console.log(router.getRoutes())
</script>

<style scoped></style>
