<template>
  <div class="header-right">
    <div class="icons flex items-center">
      <DarkSwitch class="ml-4" />
      <SettingIcon class="ml-4" />
      <FullScreen class="ml-4" />
      <Message class="ml-4" />
    </div>
    <Avatar />
  </div>
</template>

<script lang="ts" setup>
  import DarkSwitch from './components/DarkSwitch.vue'
  import FullScreen from './components/FullScreen.vue'
  import Avatar from './components/avatar.vue'
  import Message from './components/message.vue'
  import SettingIcon from './components/SettingIcon.vue'
</script>
<style lang="scss" scoped>
  .header-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
