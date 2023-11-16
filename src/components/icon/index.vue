<template>
  <template v-if="type === 'elIcon'">
    <el-icon class="icon" :style="iconStyle">
      <component :is="props.name!.replace('el-icon-', '')" />
    </el-icon>
  </template>
  <template v-else-if="type === 'local'">
    <component :is="svg" :name="props.name" :size="props.size" :color="props.color" />
  </template>
  <template v-else>
    <i class="icon" :class="[props.name]" :style="iconStyle"></i>
  </template>
</template>
<script lang="ts" setup>
  import { computed, CSSProperties } from 'vue'
  import svg from './svg/index.vue'
  defineOptions({
    name: 'Icon'
  })
  interface Props {
    name: string
    size?: string
    color?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    size: '18px'
  })

  const iconStyle = computed((): CSSProperties => {
    const { size, color } = props
    let s = `${size.replace('px', '')}px`
    return {
      fontSize: s,
      color
    }
  })
  const type = computed(() => {
    if (props.name.indexOf('el-icon-') === 0) {
      return 'elIcon'
    } else if (props.name.indexOf('local-') === 0) {
      return 'local'
    } else {
      return 'iconfont'
    }
  })
</script>
