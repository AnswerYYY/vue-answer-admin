<template>
  <div>
    <p class="text-2xl text-red-500 text-center">{{ title }}</p>
    <el-tag type="danger" size="normal" effect="dark">test</el-tag>
  </div>
</template>

<script setup lang="ts">
  import { getUserInfo } from '@/api/user'
  const title = import.meta.env.VITE_GLOB_APP_TITLE
  getUserInfo()
</script>

<style scoped></style>
