<script lang="ts">
  import { createVNode, resolveComponent, defineComponent, computed, CSSProperties } from 'vue'
  import svg from './svg/index.vue'
  export default defineComponent({
    name: 'Icon',
    props: {
      name: {
        type: String,
        required: true
      },
      size: {
        type: String,
        default: '18px'
      },
      color: {
        type: String,
        default: 'inherit'
      }
    },
    setup(props) {
      if (!props.name) {
        return ''
      }
      const iconStyle = computed((): CSSProperties => {
        const { size, color } = props
        let s = `${size.replace('px', '')}px`
        return {
          fontSize: s,
          color: color
        }
      })

      if (props.name.indexOf('el-icon-') === 0) {
        return () =>
          createVNode('el-icon', { class: 'icon el-icon', style: iconStyle.value }, [
            createVNode(resolveComponent(props.name.replace('el-icon-', '')))
          ])
      } else if (props.name.indexOf('local-') === 0) {
        return () => createVNode(svg, { name: props.name, size: props.size, color: props.color })
      } else {
        return () => createVNode('i', { class: [props.name, 'icon'], style: iconStyle.value })
      }
    }
  })
</script>
