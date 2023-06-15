<template>
  <el-switch
    v-model="useSettingStoreHook().isDark"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
    @change="handleSwitchDarkTheme"
  />
</template>

<script lang="ts" setup>
  import { Moon, Sunny } from '@element-plus/icons-vue'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import useTheme from '@/hooks/useTheme'
  function handleSwitchDarkTheme(e: boolean) {
    useSettingStoreHook().setSettings('isDark', e)
    useTheme().switchDark()
  }
</script>
<style lang="scss" scoped></style>
