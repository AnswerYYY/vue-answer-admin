<template>
  <div class="breadcrumb-box">
    <el-breadcrumb v-if="breadcrumb" :separator-icon="ArrowRight">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          :to="{ path: item.path }"
          v-for="item in breadcrumbList"
          :key="item.path"
        >
          <Icon
            size="18px"
            class="breadcrumb-icon"
            v-if="item.meta.icon && breadcrumbIcon"
            :name="item.meta.icon"
          />
          <span class="breadcrumb-text">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
  import { ArrowRight } from '@element-plus/icons-vue'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  import { Icon } from '@/components'
  const route = useRoute()
  const breadcrumbList = computed(() => {
    return route.matched.filter((e) => e.name !== 'Root')
  })
  const { breadcrumb, breadcrumbIcon } = storeToRefs(useSettingStoreHook())
</script>
<style lang="scss" scoped>
  .breadcrumb-box {
    display: flex;
    align-items: center;
    padding-right: 50px;
    overflow: hidden;
    mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
    .el-breadcrumb {
      white-space: nowrap;
      .el-breadcrumb__item {
        position: relative;
        display: inline-block;
        float: none;
        .el-breadcrumb__inner {
          display: inline-flex;
          .breadcrumb-icon {
            position: relative;
            top: 2px;
            margin-right: 4px;
          }
          .breadcrumb-text {
            margin-top: 3px;
          }
        }
        :deep(.el-breadcrumb__separator) {
          position: relative;
          top: 2px;
        }
      }
    }
  }
</style>
