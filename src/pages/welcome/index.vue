<template>
  <div class="card-wrapper">
    <div>首页</div>
    <el-button
      v-for="index in 3"
      :key="index"
      type="primary"
      @click="
        router.push({
          name: 'Detail',
          query: {
            id: index
          }
        })
      "
      >打开详情页{{ index }}</el-button
    >
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()
</script>

<style scoped></style>
