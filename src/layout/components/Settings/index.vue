<template>
  <el-drawer
    title="系统设置"
    v-model="visible"
    direction="rtl"
    size="300px"
    :show-close="true"
    :wrapperClosable="true"
  >
    <template #default>
      <el-divider>布局</el-divider>
      <div class="layout-box mb-10">
        <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]"
            @click="setLayout('vertical')"
          >
            <div class="layout-dark"></div>
            <div class="layout-container">
              <div class="layout-light"></div>
              <div class="layout-content"></div>
            </div>
            <el-icon v-if="layout == 'vertical'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="经典" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-classic', { 'is-active': layout == 'classic' }]"
            @click="setLayout('classic')"
          >
            <div class="layout-dark"></div>
            <div class="layout-container">
              <div class="layout-light"></div>
              <div class="layout-content"></div>
            </div>
            <el-icon v-if="layout == 'classic'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-transverse', { 'is-active': layout == 'transverse' }]"
            @click="setLayout('transverse')"
          >
            <div class="layout-dark"></div>
            <div class="layout-content"></div>
            <el-icon v-if="layout == 'transverse'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="分栏" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]"
            @click="setLayout('columns')"
          >
            <div class="layout-dark"></div>
            <div class="layout-light"></div>
            <div class="layout-content"></div>
            <el-icon v-if="layout == 'columns'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
      </div>
      <div class="layout"></div>
      <el-divider>主题设置</el-divider>
      <div class="settings-item flex justify-between items-center my-4">
        <span>主题颜色</span>
        <el-color-picker
          v-model="primaryColor"
          :predefine="predefineColors"
          @change="changePrimary"
        />
      </div>
      <div class="settings-item flex justify-between items-center my-4">
        <span>灰色模式</span>
        <el-switch v-model="isGrey" @change="changeGreyOrWeak('grey', !!$event)" />
      </div>
      <div class="settings-item flex justify-between items-center my-4">
        <span>色弱模式</span>
        <el-switch v-model="isWeak" @change="changeGreyOrWeak('weak', !!$event)" />
      </div>
      <div class="settings-item flex justify-between items-center my-4">
        <span>
          侧边栏反转色
          <el-tooltip
            effect="dark"
            content="该属性目前只在纵向、经典布局模式下生效"
            placement="top"
          >
            <Icon name="el-icon-questionFilled" /> </el-tooltip
        ></span>
        <el-switch
          v-model="asideInverted"
          :disabled="!['vertical', 'classic'].includes(layout)"
          @change="handleSetAsideTheme"
        />
      </div>
      <el-divider>界面设置</el-divider>
      <div class="settings-item flex justify-between items-center my-4">
        <span>折叠菜单</span>
        <el-switch v-model="isCollapse" @change="setSettings('isCollapse', !!$event)" />
      </div>
      <div class="settings-item flex justify-between items-center my-4">
        <span>面包屑</span>
        <el-switch v-model="breadcrumb" @change="setSettings('breadcrumb', !!$event)" />
      </div>
      <div class="settings-item flex justify-between items-center my-4">
        <span>面包屑图标</span>
        <el-switch v-model="breadcrumbIcon" @change="setSettings('breadcrumbIcon', !!$event)" />
      </div>
      <div class="settings-item flex justify-between items-center my-4">
        <span>标签栏</span>
        <el-switch v-model="tabs" @change="setSettings('tabs', !!$event)" />
      </div>
      <div class="settings-item flex justify-between items-center my-4">
        <span>标签栏图标</span>
        <el-switch v-model="tabsIcon" @change="setSettings('tabsIcon', !!$event)" />
      </div>
      <div class="settings-item flex justify-between items-center my-4">
        <span>页脚</span>
        <el-switch v-model="footer" @change="setSettings('footer', !!$event)" />
      </div>
      <div class="settings-item flex justify-between items-center my-4">
        <span>全局缓存</span>
        <el-switch v-model="allKeepAlive" @change="handleAllKeepAlive" />
      </div>

      <el-button
        class="w-full mt-3"
        :icon="Refresh"
        type="primary"
        size="default"
        @click="resetTheme"
        >还原设置</el-button
      >
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
  import { Refresh } from '@element-plus/icons-vue'
  import { ref } from 'vue'
  import { useSettingStoreHook } from '@/store/modules/settings'
  import useTheme from '@/hooks/useTheme'
  import { storeToRefs } from 'pinia'
  import { LayoutType } from '@/config'
  import { useKeepAliveStoreHook } from '@/store/modules/keepAlive'
  import { Icon } from '@/components'
  import mittBus from '@/utils/mittBus'

  const visible = ref(false)

  mittBus.on('openSettingDrawer', () => {
    visible.value = true
  })

  const {
    isGrey,
    isWeak,
    primaryColor,
    footer,
    layout,
    allKeepAlive,
    asideInverted,
    isCollapse,
    breadcrumb,
    breadcrumbIcon,
    tabs,
    tabsIcon
  } = storeToRefs(useSettingStoreHook())
  const { setSettings } = useSettingStoreHook()
  const { changeGreyOrWeak, changePrimary, predefineColors, resetTheme, setAsideTheme } = useTheme()
  const setLayout = (e: LayoutType) => {
    setSettings('layout', e)
    setAsideTheme()
  }
  const handleAllKeepAlive = () => {
    useKeepAliveStoreHook().setKeepAliveNames()
  }
  const handleSetAsideTheme = (e: boolean) => {
    setSettings('asideInverted', e)
    setAsideTheme()
  }
</script>
<style lang="scss" scoped>
  .layout-box {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px 0 0;
    .layout-item {
      position: relative;
      box-sizing: border-box;
      width: 98px;
      height: 68px;
      padding: 6px;
      margin-bottom: 20px;
      cursor: pointer;
      border-radius: 5px;
      box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
      transition: all 0.2s;
      .layout-dark {
        background-color: var(--el-color-primary);
        border-radius: 3px;
      }
      .layout-light {
        background-color: var(--el-color-primary-light-5);
        border-radius: 3px;
      }
      .layout-content {
        background-color: var(--el-color-primary-light-8);
        border: 1px dashed var(--el-color-primary);
        border-radius: 3px;
      }
      .el-icon {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: var(--el-color-primary);
        transition: all 0.2s;
      }
      &:hover {
        box-shadow: 0 0 5px 1px var(--el-border-color-darker);
      }
    }
    .is-active {
      box-shadow: 0 0 0 2px var(--el-color-primary) !important;
    }
    .layout-vertical {
      display: flex;
      justify-content: space-between;
      .layout-dark {
        width: 20%;
      }
      .layout-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 72%;
        .layout-light {
          height: 20%;
        }
        .layout-content {
          height: 67%;
        }
      }
    }
    .layout-classic {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .layout-dark {
        height: 22%;
      }
      .layout-container {
        display: flex;
        justify-content: space-between;
        height: 70%;
        .layout-light {
          width: 20%;
        }
        .layout-content {
          width: 70%;
        }
      }
    }
    .layout-transverse {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .layout-dark {
        height: 20%;
      }
      .layout-content {
        height: 67%;
      }
    }
    .layout-columns {
      display: flex;
      justify-content: space-between;
      .layout-dark {
        width: 14%;
      }
      .layout-light {
        width: 17%;
      }
      .layout-content {
        width: 55%;
      }
    }
  }
</style>
