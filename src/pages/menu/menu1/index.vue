<template>
  <div class="card-wrapper">
    <div> Menu1 </div>
    <el-input v-model="input" placeholder="测试缓存" clearable />
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'Menu1'
  })
  import { ref } from 'vue'
  const input = ref<string>('')
</script>
<style lang="scss" scoped></style>
