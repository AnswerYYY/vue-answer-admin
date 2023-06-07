<template>
  <router-view />
</template>

<script setup lang="ts">
  import useTheme from '@/hooks/useTheme'
  // init theme
  const { initTheme } = useTheme()
  initTheme()
</script>

<style scoped></style>
