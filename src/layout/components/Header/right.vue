<template>
  <div class="header-right">
    <div class="icons flex items-center">
      <Settings class="ml-4" />
      <DarkSwitch class="ml-4" />
      <FullScreen class="ml-4" />
    </div>
    <el-button class="ml-4" type="primary" size="default" @click="handleLogOut">
      退出登录
    </el-button>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStoreHook } from '@/store/modules/user'
  import { useRouter } from 'vue-router'
  import Settings from '../Settings/index.vue'
  import DarkSwitch from '../Settings/DarkSwitch.vue'
  import FullScreen from '../Settings/FullScreen.vue'
  const router = useRouter()
  function handleLogOut() {
    useUserStoreHook()
      .logOut()
      .then(() => {
        router.replace('/login')
      })
  }
</script>
<style lang="scss" scoped>
  .header-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 24px;
  }
</style>
