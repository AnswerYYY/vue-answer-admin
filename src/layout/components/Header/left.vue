<template>
  <div class="header-left">
    <el-icon size="24" @click="useSettingStoreHook().setSettings('isCollapse', !isCollapse)">
      <Expand v-if="isCollapse" />
      <Fold v-else />
    </el-icon>

    <div class="breadcrumb-box ml-2">
      <el-breadcrumb :separator-icon="ArrowRight">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item :to="{ path: item.path }" v-for="item in breadcrumb" :key="item.path">
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ArrowRight } from '@element-plus/icons-vue'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  const route = useRoute()
  const breadcrumb = computed(() => {
    return route.matched.filter((e) => e.name !== 'Root')
  })

  const { isCollapse } = storeToRefs(useSettingStoreHook())
</script>
<style lang="scss" scoped>
  .header-left {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
