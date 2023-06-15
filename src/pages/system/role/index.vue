<template>
  <div class="card-wrapper">
    <div> role </div>
    <el-input v-model="input" placeholder="测试缓存" size="normal" clearable />
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'Role'
  })
  import { ref } from 'vue'
  const input = ref<string>('')
</script>
<style lang="scss" scoped></style>
