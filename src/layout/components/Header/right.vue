<template>
  <div class="header-right">
    <div class="icons flex items-center">
      <DarkSwitch class="ml-4" />
      <Settings class="ml-4" />
      <FullScreen class="ml-4" />
      <Message class="ml-4" />
    </div>
    <Avatar />
  </div>
</template>

<script lang="ts" setup>
  import Settings from '../Settings/index.vue'
  import DarkSwitch from '../Settings/DarkSwitch.vue'
  import FullScreen from '../Settings/FullScreen.vue'
  import Avatar from './components/avatar.vue'
  import Message from './components/message.vue'
</script>
<style lang="scss" scoped>
  .header-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
