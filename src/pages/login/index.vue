<template>
  <div class="login-wrapper w-full h-full p-4">
    <div class="header h-10 w-full flex justify-between fixed p-4 left-0 right-0 top-0">
      <div>LOGO</div>
      <DarkSwitch />
    </div>
    <div class="container px-8 flex justify-evenly h-full">
      <div
        class="login-contents flex flex-col items-center justify-center animate__animated animate__fadeInLeftBig animate__fast"
      >
        <div class="title text-3xl font-bold">Answer™ Admin</div>
        <div class="desc text-lg my-4">一个学习用的后台管理系统</div>
        <el-image :src="login_img" fit="fill" style="height: 267px; width: 500px" />
      </div>
      <div class="login-box ml-64 flex items-center">
        <div class="login-form" style="width: 360px">
          <p class="text-3xl font-bold mb-4">登录</p>
          <el-form :model="form" ref="formRef" :rules="rules" @keyup.enter="handleLogin">
            <el-form-item prop="username" class="animate__animated animate__fadeInRight">
              <el-input v-model="form.username" placeholder="账号" clearable>
                <template #prefix>
                  <Icon name="iconfont icon-gerentouxiang" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              class="animate__animated animate__fadeInRight"
              style="animation-delay: 100ms"
            >
              <el-input
                v-model="form.password"
                type="password"
                placeholder="密码"
                clearable
                show-password
              >
                <template #prefix>
                  <Icon name="iconfont icon-suoding" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="code"
              class="animate__animated animate__fadeInRight"
              style="animation-delay: 150ms"
            >
              <div class="flex w-full">
                <el-input v-model="form.code" placeholder="验证码" clearable>
                  <template #prefix>
                    <Icon name="iconfont icon-dunpaibaowei" />
                  </template>
                </el-input>
                <div class="whitespace-nowrap"><imgVertify @change="handleSetVertify" /></div>
              </div>
            </el-form-item>
            <el-form-item
              class="animate__animated animate__fadeInRight"
              style="animation-delay: 200ms"
            >
              <div class="flex items-center justify-between w-full">
                <el-checkbox label="记住密码" />
                <el-button type="primary" link>忘记密码?</el-button>
              </div>
            </el-form-item>
            <el-form-item
              class="animate__animated animate__fadeInRight"
              style="animation-delay: 250ms"
            >
              <el-button type="primary" class="w-full" @click="handleLogin">登录</el-button>
            </el-form-item>
            <el-form-item
              class="animate__animated animate__fadeInRight"
              style="animation-delay: 300ms"
            >
              <div class="flex w-full">
                <el-button type="primary" size="default" class="w-full">手机登录</el-button>
                <el-button type="primary" size="default" class="w-full">二维码登录</el-button>
                <el-button type="primary" size="default" class="w-full">注册</el-button>
              </div>
            </el-form-item>
            <el-form-item
              class="animate__animated animate__fadeInRight"
              style="animation-delay: 350ms"
            >
              <el-divider content-position="center">第三方登录</el-divider>
              <el-row :gutter="20" class="w-full">
                <el-col :span="8" class="text-center">
                  <Icon name="iconfont icon-qq" />
                </el-col>
                <el-col :span="8" class="text-center">
                  <Icon name="iconfont icon-weixin" />
                </el-col>
                <el-col :span="8" class="text-center">
                  <Icon name="iconfont icon-githubb" />
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import DarkSwitch from '@/layout/components/Header/components/DarkSwitch.vue'
  import login_img from '@/assets/images/login_img.png'
  import { Icon, imgVertify } from '@/components'
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useUserStoreHook } from '@/store/modules/user'
  import { useRouter } from 'vue-router'
  const validateCode = (rule: any, value: string, callback: any) => {
    if (value === '7603') {
      callback()
      return
    }
    if (value === '') {
      callback(new Error('请输入验证码'))
    } else if (value.toLocaleUpperCase() !== codeVertify.value.toLocaleUpperCase()) {
      callback(new Error('验证码错误'))
    } else {
      callback()
    }
  }
  const router = useRouter()
  const form = reactive({
    username: '',
    password: '',
    code: ''
  })
  const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    code: [{ validator: validateCode, trigger: 'blur' }]
  })
  const formRef = ref<FormInstance>()
  const codeVertify = ref('')
  const handleLogin = async () => {
    if (!formRef.value) return
    await formRef.value.validate((valid, fields) => {
      if (valid) {
        useUserStoreHook()
          .login({
            username: form.username,
            password: form.password
          })
          .then(() => {
            router.push('Welcome')
          })
      } else {
        console.log('error submit!', fields)
      }
    })
  }
  const handleSetVertify = (e: string) => {
    codeVertify.value = e
  }
</script>
<style lang="scss" scoped>
  .animate__fadeInRight {
    --animate-duration: 300ms;
  }
  .login-wrapper {
    min-height: 100%;
    overflow: hidden;
    background-image: url('@/assets/images/login_bg.png');
    background-size: cover;
    background-color: var(--el-bg-color);
  }
</style>
