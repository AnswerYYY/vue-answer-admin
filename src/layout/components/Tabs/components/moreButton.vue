<template>
  <el-dropdown trigger="hover" :teleported="false">
    <div>
      <Icon name="iconfont icon-Androidgengduo" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="Refresh" @click="refresh">
          <span>刷新</span>
        </el-dropdown-item>
        <el-dropdown-item icon="Remove" @click="closeCurrent">
          <span>关闭当前</span>
        </el-dropdown-item>
        <el-dropdown-item icon="CircleClose" @click="closeOther">
          <span>关闭其它</span>
        </el-dropdown-item>
        <el-dropdown-item icon="FolderDelete" @click="closeAll">
          <span>关闭全部</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
  import useTabs from '@/hooks/useTabs'
  import { Icon } from '@/components'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()
  const { closeAll, closeCurrent, closeOther, refresh } = useTabs(route, router)
</script>
<style lang="scss" scoped></style>
