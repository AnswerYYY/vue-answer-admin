<template>
  <div class="card-wrapper">
    <div> Menu2-1-1 这个不缓存</div>
    <el-input v-model="input" placeholder="测试缓存" clearable />
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'Menu211'
  })
  import { ref } from 'vue'
  const input = ref<string>('')
</script>
<style lang="scss" scoped></style>
