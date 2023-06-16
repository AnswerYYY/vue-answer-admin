<template>
  <!-- 分栏布局 -->
  <el-container class="layout">
    <div class="aside-split">
      <SubLogo :show-title="false" />
      <el-scrollbar>
        <div class="split-list">
          <div
            v-for="item in menus"
            :key="item.path"
            class="split-item"
            :class="{
              'split-active':
                splitActive === item.path || `/${splitActive.split('/')[1]}` === item.path
            }"
            @click="handleChangeSubMenu(item)"
          >
            <Icon size="21px" :name="item.meta?.icon" />
            <span class="title">{{ item.meta?.title }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <el-aside
      :class="{ 'not-aside': !subMenuList.length }"
      :style="{ width: isCollapse ? '65px' : '210px' }"
    >
      <div class="logo flex items-center justify-center">
        <span class="logo-text">{{ title }}</span>
      </div>
      <el-scrollbar>
        <el-menu
          router
          :collapse="isCollapse"
          :default-active="activeMenu"
          :unique-opened="true"
          :collapse-transition="false"
        >
          <SubMenu :menus="subMenuList" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container direction="vertical">
      <el-header>
        <HeaderLeft />
        <HeaderRight />
      </el-header>
      <AppMain />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
  import { useSettingStoreHook } from '@/store/modules/settings'
  import { AppMain, SubLogo, HeaderLeft, HeaderRight, SubMenu } from '../components'
  import { storeToRefs } from 'pinia'
  import { usePermissionStoreHook } from '@/store/modules/permission'
  import { computed, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Icon } from '@/components'
  import { RouteRecordRaw } from 'vue-router'
  const { isCollapse } = storeToRefs(useSettingStoreHook())
  const title = computed(() => {
    const VITE_GLOB_APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE
    return isCollapse.value ? VITE_GLOB_APP_TITLE.substring(0, 1) : VITE_GLOB_APP_TITLE
  })
  const menus = usePermissionStoreHook().completeMenus.map((e) => {
    // 子菜单为一项不显示层级
    if (e.children && e.children.length === 1 && !e.meta?.alwaysShow) {
      return e.children[0]
    }
    return e
  })
  const route = useRoute()
  const router = useRouter()

  const activeMenu = computed(
    () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
  )

  const splitActive = ref('')
  const subMenuList = ref<RouteRecordRaw[]>([])
  watch(
    () => [menus, route],
    () => {
      if (!menus.length) return
      splitActive.value = route.path
      const menuItem = menus.find((item) => {
        return route.path === item.path || `/${route.path.split('/')[1]}` === item.path
      })
      if (menuItem && menuItem.children?.length) {
        subMenuList.value = menuItem.children
      } else {
        subMenuList.value = []
      }
    },
    {
      deep: true,
      immediate: true
    }
  )
  const handleChangeSubMenu = (e: RouteRecordRaw) => {
    splitActive.value = e.path
    if (e.children?.length) {
      subMenuList.value = e.children
    } else {
      subMenuList.value = []
      router.push(e.path)
    }
  }
</script>
<style lang="scss" scoped>
  .layout {
    width: 100vw;
    height: 100vh;

    .aside-split {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: 70px;
      height: 100%;
      background-color: #191a20;
      border-right: 1px solid var(--el-border-color-light);
      .logo {
        box-sizing: border-box;
        height: 55px;
        border-bottom: 1px solid #282a35;
        .logo-img {
          width: 32px;
          object-fit: contain;
        }
      }
      .el-scrollbar {
        height: calc(100% - 55px);
        .split-list {
          flex: 1;
          .split-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 70px;
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
              background-color: #292b35;
            }

            .title {
              margin-top: 6px;
              font-size: 12px;
            }
            .icon,
            .title {
              color: #e5eaf3;
            }
          }
          .split-active {
            background-color: var(--el-color-primary) !important;
            .icon,
            .title {
              color: #ffffff !important;
            }
          }
        }
      }
    }
    .not-aside {
      width: 0 !important;
      border-right: none !important;
    }
    .el-aside {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      background-color: var(--el-menu-bg-color);
      border-right: 1px solid var(--el-border-color-light);
      transition: width 0.3s ease;
      .el-scrollbar {
        height: calc(100% - 55px);
        .el-menu {
          width: 100%;
          overflow-x: hidden;
          border-right: none;
        }
      }
      .logo {
        box-sizing: border-box;
        height: 55px;
        border-bottom: 1px solid var(--el-border-color-light);
        .logo-text {
          font-size: 24px;
          font-weight: bold;
          color: var(--el-menu-text-color);
          white-space: nowrap;
        }
      }
    }

    .el-header {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 55px;
      padding: 0 15px;
      background-color: var(--el-bg-color);
      border-bottom: 1px solid var(--el-border-color-light);
    }
  }
</style>
