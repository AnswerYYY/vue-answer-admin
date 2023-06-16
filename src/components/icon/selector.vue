<template>
  <el-popover
    ref="popover"
    placement="right"
    title="图标选择"
    :width="400"
    trigger="click"
    @hide="handlePopoverHide"
    @show="initState(activeName)"
  >
    <template #reference>
      <el-button>选择图标</el-button>
    </template>
    <div v-loading="loading">
      <el-input v-model="search" placeholder="搜索图标" clearable @input="initState(activeName)">
        <template #prefix>
          <Icon name="el-icon-search" size="16" />
        </template>
      </el-input>

      <el-tabs v-model="activeName" @tab-click="handleTabClick" @tab-change="initState">
        <el-tab-pane
          v-for="item in state"
          :key="item.iconType"
          :label="item.iconType"
          :name="item.iconType"
        >
          <el-scrollbar v-if="item.iconNames.length" height="200px">
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
          <el-empty v-else description="暂未图标" :image-size="100" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
  import Icon from './index.vue'
  import { getElementPlusIconfontNames, getIconfontNames, getLocalIconfontNames } from './utils'
  import { reactive, ref } from 'vue'
  import { IconFontName } from '@/components/icon/utils'
  import type { PopoverInstance, TabsPaneContext } from 'element-plus'
  import { useDebounceFn } from '@vueuse/core'
  import { nextTick } from 'vue'
  interface Emits {
    (event: 'change', icon: string): void
  }
  const search = ref('')
  const activeName = ref('Local')
  const loading = ref(true)
  const popover = ref<PopoverInstance>()
  const emits = defineEmits<Emits>()

  const state = reactive<Array<{ iconType: string; iconNames: IconFontName[]; loading: boolean }>>([
    {
      iconType: 'Local',
      iconNames: [],
      loading: false
    },
    {
      iconType: 'ElementPlus',
      iconNames: [],
      loading: false
    },
    {
      iconType: 'Iconfont',
      iconNames: [],
      loading: false
    }
  ])
  const filterData = (data: IconFontName[]) => {
    return data.filter((e) => {
      return e.name.toLocaleUpperCase().includes(search.value.toLocaleUpperCase())
    })
  }
  const initState = useDebounceFn((activeName: string) => {
    const index = state.findIndex((e) => e.iconType === activeName)
    // loading.value = true
    switch (activeName) {
      case 'Local':
        getLocalIconfontNames()
          .then((res) => {
            state[index].iconNames = filterData(res)
          })
          .finally(() => {
            nextTick(() => {
              loading.value = false
            })
          })
        break
      case 'ElementPlus':
        getElementPlusIconfontNames()
          .then((res) => {
            state[index].iconNames = filterData(res)
          })
          .finally(() => {
            nextTick(() => {
              loading.value = false
            })
          })
        break
      default:
        getIconfontNames()
          .then((res) => {
            state[index].iconNames = filterData(res)
          })
          .finally(() => {
            nextTick(() => {
              loading.value = false
            })
          })
        break
    }
  }, 500)
  const handleTabClick = (pane: TabsPaneContext) => {
    // change事件加载状态不能及时反应，放在点击事件内
    if (pane.paneName !== activeName.value) {
      loading.value = true
    }
  }
  const handleClickICon = (icon: string) => {
    emits('change', icon)
    popover.value?.hide()
  }
  const handlePopoverHide = () => {
    // activeName.value = 'Local'
    search.value = ''
  }
</script>
<style lang="scss" scoped></style>
