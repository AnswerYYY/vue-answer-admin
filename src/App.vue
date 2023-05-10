<template>
  <div>
    <p class="text-2xl text-red-500 text-center">{{ title }}</p>
    <el-tag type="danger" size="normal" effect="dark">test</el-tag>
  </div>
</template>

<script setup lang="ts">
  const title = import.meta.env.VITE_GLOB_APP_TITLE
</script>

<style scoped></style>
