<template>
  <div>
    <el-button type="primary" size="default" @click="handleLogin">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStoreHook } from '@/store/modules/user'
  import router from '@/router'
  const handleLogin = () => {
    useUserStoreHook()
      .login({
        username: 'admin',
        password: 'admin123'
      })
      .then(() => {
        router.push('Welcome')
      })
  }
</script>
<style lang="scss" scoped></style>
