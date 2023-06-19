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
  import { userExpireToken } from '@/api/user'
  import { getAbortRequest } from '@/api/system'
  import { ref } from 'vue'
  import { http } from '@/utils/http'
  const input = ref<string>('')
  userExpireToken().then((res) => {
    console.log(res)
  })
  userExpireToken().then((res) => {
    console.log(res)
  })
  userExpireToken().then((res) => {
    console.log(res)
  })
  getAbortRequest({ id: 1 }).then((res) => {
    console.log('延时1', res)
  })
  getAbortRequest({ id: 2 }).then((res) => {
    console.log('延时2', res)
  })
  setTimeout(() => {
    http.cancelRequest()
  }, 1000)
</script>
<style lang="scss" scoped></style>
