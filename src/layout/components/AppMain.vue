<template>
  <el-main>
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>
<style lang="scss" scoped></style>
