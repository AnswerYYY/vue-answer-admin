<template>
  <el-popover ref="popover" placement="right" title="图标选择" :width="400" trigger="click">
    <template #reference>
      <el-button>选择图标</el-button>
    </template>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane
        v-for="item in state"
        :key="item.iconType"
        :label="item.iconType"
        :name="item.iconType"
      >
        <el-scrollbar height="200px">
          <div class="flex flex-wrap">
            <div
              class="icon-item p-2 w-1/6 flex"
              v-for="(icon, index) in item.iconNames"
              :key="index"
            >
              <el-tooltip effect="dark" :content="icon.name" placement="bottom">
                <Icon
                  :name="icon.icon"
                  size="20"
                  class="cursor-pointer"
                  @click="handleClickICon(icon.icon)"
                />
              </el-tooltip>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script lang="ts" setup>
  import Icon from './index.vue'
  import { getElementPlusIconfontNames, getIconfontNames, getLocalIconfontNames } from './utils'
  import { reactive, ref } from 'vue'
  import { IconFontName } from '@/components/icon/utils'
  import type { PopoverInstance } from 'element-plus'
  interface Emits {
    (event: 'click', icon: string): void
  }
  const activeName = ref('Local')
  const popover = ref<PopoverInstance>()
  const emits = defineEmits<Emits>()

  const state = reactive<Array<{ iconType: string; iconNames: IconFontName[] }>>([
    {
      iconType: 'Local',
      iconNames: []
    },
    {
      iconType: 'ElementPlus',
      iconNames: []
    },
    {
      iconType: 'Iconfont',
      iconNames: []
    }
  ])
  getLocalIconfontNames().then((res) => {
    state[0].iconNames = res
  })
  getElementPlusIconfontNames().then((res) => {
    state[1].iconNames = res
  })
  getIconfontNames().then((res) => {
    state[2].iconNames = res
  })
  const handleClickICon = (icon: string) => {
    emits('click', icon)
    // activeName.value = 'Local'
    popover.value?.hide()
  }
</script>
<style lang="scss" scoped></style>
