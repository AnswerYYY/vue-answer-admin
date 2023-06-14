<template>
  <Tabs />
  <el-main>
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in" mode="out-in">
        <keep-alive :include="useKeepAliveStoreHook().keepAliveNames">
          <component :is="Component" v-if="!refreshIng" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-if="footer">
    <Footer />
  </el-footer>
</template>

<script lang="ts" setup>
  import { ref, provide } from 'vue'
  import { useRoute } from 'vue-router'
  import Footer from '../Footer/index.vue'
  import Tabs from '../Tabs/index.vue'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { storeToRefs } from 'pinia'
  import { useKeepAliveStoreHook } from '@/store/modules/keepAlive'
  const { footer } = storeToRefs(useSettingStoreHook())
  const route = useRoute()
  const refreshIng = ref(false)
  const refreshPage = (val: boolean) => {
    console.log('refreshPage', val)

    refreshIng.value = val
  }
  provide('refreshPage', refreshPage)
</script>
<style lang="scss" scoped>
  .el-main {
    box-sizing: border-box;
    padding: 10px 12px;
    overflow-x: hidden;
    background-color: var(--el-bg-color-page);
  }
  .el-footer {
    height: auto;
    padding: 0;
  }
</style>
