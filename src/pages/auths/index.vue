<template>
  <div>
    <p>按钮权限</p>
    <el-alert
      class="mb-5"
      :title="`当前页面用户按钮权限：${auths}`"
      type="success"
      :closable="false"
    />
    <el-divider content-position="left"> 使用 hasAuth 方式绑定权限 </el-divider>
    <el-button v-if="hasAuth('btn_add')" type="primary" size="default">新增</el-button>
    <el-button v-if="hasAuth('btn_edit')" type="primary" size="default">编辑</el-button>
    <el-button v-if="hasAuth('btn_delete')" type="primary" size="default">删除</el-button>
    <el-button v-if="hasAuth('btn_import')" type="primary" size="default">导入数据</el-button>
    <el-button v-if="hasAuth('btn_export')" type="primary" size="default">导出数据</el-button>
    <el-divider content-position="left"> 使用 v-auth 方式绑定单个权限 </el-divider>
    <el-button v-auth="'btn_add'" type="primary" size="default">新增</el-button>
    <el-button v-auth="'btn_edit'" type="primary" size="default">编辑</el-button>
    <el-button v-auth="'btn_delete'" type="primary" size="default">删除</el-button>
    <el-button v-auth="'btn_import'" type="primary" size="default">导入数据</el-button>
    <el-button v-auth="'btn_export'" type="primary" size="default">导出数据</el-button>
    <el-divider content-position="left"> 使用 v-auth 方式绑定多个权限 </el-divider>
    <el-button
      v-auth="['btn_add', 'btn_edit', 'btn_delete', 'btn_import', 'btn_export']"
      type="primary"
      size="default"
      >新增</el-button
    >
    <el-button
      v-auth="['btn_add', 'btn_edit', 'btn_delete', 'btn_import', 'btn_export']"
      type="primary"
      size="default"
      >编辑</el-button
    >
    <el-button
      v-auth="['btn_add', 'btn_edit', 'btn_delete', 'btn_import', 'btn_export']"
      type="primary"
      size="default"
      >删除</el-button
    >
    <el-button
      v-auth="['btn_add', 'btn_edit', 'btn_delete', 'btn_import', 'btn_export']"
      type="primary"
      size="default"
      >导入数据</el-button
    >
    <el-button
      v-auth="['btn_add', 'btn_edit', 'btn_delete', 'btn_import', 'btn_export']"
      type="primary"
      size="default"
      >导出数据</el-button
    >
  </div>
</template>

<script lang="ts" setup>
  import { hasAuth } from '@/router/utils'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const auths = JSON.stringify(route.meta.auths)
  defineOptions({
    name: 'BtnAuths'
  })
</script>
<style lang="scss" scoped></style>
