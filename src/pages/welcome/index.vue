<template>
  <div>
    <div>首页</div>
    <el-button type="" @click="router.push('/system/user/index')">user</el-button>
    <Icon name="local-zhaofangliang" size="30px" color="red" />
    <Icon name="el-icon-edit" size="30px" color="red" />
    <Icon name="iconfont icon-defen" size="30px" color="red" />
    <IconSelector />
  </div>
</template>

<script setup lang="ts">
  import { Icon, IconSelector } from '@/components'
  import { useRouter } from 'vue-router'
  const router = useRouter()
</script>

<style scoped></style>
