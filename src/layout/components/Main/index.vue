<template>
  <Tabs v-if="tabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutRight"
        mode="out-in"
      >
        <keep-alive :include="useKeepAliveStoreHook().keepAliveNames">
          <component :is="Component" v-if="!refreshIng" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-if="footer">
    <Footer />
  </el-footer>
</template>

<script lang="ts" setup>
  import { ref, watch, onBeforeUnmount } from 'vue'
  import Footer from '../Footer/index.vue'
  import Tabs from '../Tabs/index.vue'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { storeToRefs } from 'pinia'
  import { useKeepAliveStoreHook } from '@/store/modules/keepAlive'
  import { useDebounceFn } from '@vueuse/core'
  const { footer, layout, tabs, isCollapse } = storeToRefs(useSettingStoreHook())
  import mittBus from '@/utils/mittBus'
  // 刷新当前页面
  const refreshIng = ref(false)
  const refreshPage = (val: boolean) => {
    refreshIng.value = val
  }
  mittBus.on('refreshPage', refreshPage)

  // 监听布局变化，在 body 上添加相对应的 layout class
  watch(
    () => layout.value,
    () => {
      const body = document.body as HTMLElement
      body.setAttribute('class', layout.value)
    },
    { immediate: true }
  )

  // 监听窗口大小变化，折叠侧边栏
  const screenWidth = ref(0)
  const listeningWindow = useDebounceFn(() => {
    screenWidth.value = document.body.clientWidth
    if (!isCollapse.value && screenWidth.value < 1200)
      useSettingStoreHook().setSettings('isCollapse', true)
    if (isCollapse.value && screenWidth.value > 1200)
      useSettingStoreHook().setSettings('isCollapse', false)
  }, 100)
  window.addEventListener('resize', listeningWindow, false)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', listeningWindow)
  })
</script>
<style lang="scss" scoped>
  .animate__fadeInRight {
    --animate-duration: 300ms;
  }
  .animate__fadeOutRight {
    --animate-duration: 150ms;
  }
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
