<template>
  <div class="card-wrapper" style="height: 200vh">
    <div>当前选择图标：{{ iconName }}</div>
    <div>
      <Icon v-if="iconName" :name="iconName" size="30px" />
      <p v-else>暂未选择</p>
    </div>
    <IconSelector @change="handleChangeIcon" />
  </div>
</template>

<script setup lang="ts">
  import { Icon, IconSelector } from '@/components'
  import { ref } from 'vue'
  defineOptions({
    name: 'IconSelector'
  })
  const iconName = ref('')
  const handleChangeIcon = (e: string) => {
    iconName.value = ''
    setTimeout(() => {
      iconName.value = e
    }, 1)
  }
</script>

<style scoped></style>
