<template>
  <PageHeaderWrapper
    content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    :tags="[
      { title: 'Vip', type: 'error' },
      { title: 'Vip', type: 'error' },
      { title: 'Vip', type: 'error' }
    ]"
    :tabs="[
      {
        label: '标签1',
        key: '标签1'
      },
      {
        label: '标签2',
        key: '标签2'
      },
      {
        label: '标签3',
        key: '标签3'
      }
    ]"
  >
    15
    <template #extra>
      <el-button type="primary" size="default">取消</el-button>
      <el-button type="primary" size="default">保存</el-button>
    </template>
  </PageHeaderWrapper>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'Dept'
  })
</script>
<style lang="scss" scoped></style>
