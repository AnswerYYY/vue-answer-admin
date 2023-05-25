<template>
  <el-header>
    layout
    <el-button type="primary" size="default" @click="handleLogOut">退出登录</el-button>
    <el-button type="primary" size="default" @click="toggleDark()">{{
      isDark ? 'Dark' : 'Light'
    }}</el-button>
    <el-color-picker v-model="color" @change="setColor" />
  </el-header>
</template>

<script lang="ts" setup>
  import { useDark, useToggle } from '@vueuse/core'
  import { useUserStoreHook } from '@/store/modules/user'
  import { useRouter } from 'vue-router'
  import { darken, lighten } from '@/utils/browser-utils'
  import { ref } from 'vue'
  const router = useRouter()
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  function handleLogOut() {
    useUserStoreHook()
      .logOut()
      .then(() => {
        router.replace('/login')
      })
  }
  const color = ref('#409EFF')
  function setColor() {
    document.documentElement.style.setProperty('--el-color-primary', color.value)
    for (let i = 1; i <= 2; i++) {
      setPropertyPrimary('dark', i, color.value)
    }
    for (let i = 1; i <= 9; i++) {
      setPropertyPrimary('light', i, color.value)
    }
  }
  function setPropertyPrimary(mode: string, i: number, color: string) {
    document.documentElement.style.setProperty(
      `--el-color-primary-${mode}-${i}`,
      mode === 'dark' ? darken(color, i / 10) : lighten(color, i / 10)
    )
  }
</script>
<style lang="scss" scoped></style>
