<template>
  <div class="card-wrapper">
    <div> 三级路由缓存测试 </div>
    <el-input v-model="input" placeholder="测试缓存" size="normal" clearable />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const input = ref<string>('')
</script>
<style lang="scss" scoped></style>
