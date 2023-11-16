<template>
  <div>
    <el-popover placement="bottom" title="" :width="310" trigger="click">
      <template #reference>
        <el-badge :value="5" :max="99">
          <Icon size="28" name="iconfont icon-xiaoxi" />
        </el-badge>
      </template>
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="通知(5)" name="notice">
          <el-scrollbar height="300px">
            <div class="message-list">
              <div class="message-item" v-for="item in 15" :key="item">
                <el-image class="message-img" :src="messageImg" fit="fill" />
                <div class="message-content">
                  <span class="message-title truncate">
                    这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息
                  </span>
                  <span class="message-time">1小时前</span>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="消息(0)" name="message">
          <el-scrollbar height="284px">
            <el-empty :image-size="80" description="暂无消息" />
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="代办(0)" name="work">
          <el-scrollbar height="284px">
            <el-empty :image-size="80" description="暂无代办" />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@/components'
  import { ref } from 'vue'
  import messageImg from '@/assets/images/msg02.png'
  const activeName = ref('notice')
</script>
<style lang="scss" scoped>
  :deep(.el-badge__content.is-fixed) {
    top: 10px;
  }
  .message-list {
    display: flex;
    flex-direction: column;
    .message-item {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid var(--el-border-color-light);
      cursor: pointer;
      .message-img {
        width: 40px;
        height: 40px;
        margin: 0 20px 0 5px;
      }
      .message-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        .message-title {
          color: var(--el-text-color-primary);
          margin-bottom: 6px;
          width: 200px;
          display: inline-block;
        }
        .message-time {
          font-size: 12px;
          color: var(--el-text-color-placeholder);
        }
      }
    }
  }
</style>
