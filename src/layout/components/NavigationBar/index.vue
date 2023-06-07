<template>
  <el-header>
    layout
    <el-button type="primary" size="default" @click="handleLogOut"
      >退出登录{{ useSettingStoreHook().isDark }}</el-button
    >
    <el-button type="primary" size="default" @click="handleSwitchDarkTheme">{{
      useSettingStoreHook().isDark ? 'Dark' : 'Light'
    }}</el-button>
    <el-color-picker
      v-model="useSettingStoreHook().primaryColor"
      :predefine="useTheme().predefineColors"
      @change="setColor"
    />
  </el-header>
</template>

<script lang="ts" setup>
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { useUserStoreHook } from '@/store/modules/user'
  import { useRouter } from 'vue-router'
  import useTheme from '@/hooks/useTheme'
  const router = useRouter()
  function handleLogOut() {
    useUserStoreHook()
      .logOut()
      .then(() => {
        router.replace('/login')
      })
  }
  function setColor(val: string) {
    useTheme().changePrimary(val)
  }
  function handleSwitchDarkTheme() {
    useSettingStoreHook().setSettings('isDark', !useSettingStoreHook().isDark)
    useTheme().switchDark()
  }
</script>
<style lang="scss" scoped></style>
