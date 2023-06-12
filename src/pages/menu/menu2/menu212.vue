<template>
  <div>
    <div> Menu2-1-2 这个缓存</div>
    <el-input v-model="input" placeholder="测试缓存" size="normal" clearable />
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'Menu212'
  })
  import { ref } from 'vue'
  const input = ref<string>('')
</script>
<style lang="scss" scoped></style>
