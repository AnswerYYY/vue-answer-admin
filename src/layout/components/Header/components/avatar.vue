<template>
  <div class="avatar-box flex items-center ml-4">
    <span class="name mr-2 text-sm">{{ info.name }}</span>
    <el-dropdown trigger="click" size="small">
      <el-avatar :size="40" :src="avatar" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="User">个人信息</el-dropdown-item>
          <el-dropdown-item icon="EditPen">修改密码</el-dropdown-item>
          <el-dropdown-item icon="SwitchButton" divided @click="handleLogOut"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
  import avatar from '@/assets/images/avatar.jpg'
  import { useUserStoreHook } from '@/store/modules/user'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const { info }: any = storeToRefs(useUserStoreHook())
  function handleLogOut() {
    useUserStoreHook()
      .logOut()
      .then(() => {
        router.replace('/login')
      })
  }
</script>
<style lang="scss" scoped></style>
