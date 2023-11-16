<template>
  <div>
    <canvas id="captcha-canvas" :width="width" :height="height" @click="generateCaptcha"></canvas>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'

  interface Props {
    width?: number
    height?: number
    count?: number
    lineCount?: number
    dotCount?: number
    identifyCode?: string
    fontSizeMin?: number
    fontSizeMax?: number
    bgColor: string
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 120,
    height: 40,
    count: 4,
    lineCount: 4,
    dotCount: 50,
    fontSizeMin: 28,
    fontSizeMax: 35,
    identifyCode: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    bgColor: '#fff'
  })

  const emits = defineEmits<{
    change: [data: string]
  }>()

  // 生成一个随机数
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
  }
  // 生成一个随机的颜色
  const getRandomColor = (min: number, max: number) => {
    let r = getRandomNumber(min, max)
    let g = getRandomNumber(min, max)
    let b = getRandomNumber(min, max)
    return 'rgb(' + r + ',' + g + ',' + b + ')'
  }
  const generateCaptcha = () => {
    const canvas = document.getElementById('captcha-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    // 绘制背景色
    ctx.fillStyle = props.bgColor
    ctx.fillRect(0, 0, props.width, props.height)

    generateRandomCode(ctx)
    generateDot(ctx)
    generateLine(ctx)
  }
  onMounted(() => {
    generateCaptcha()
  })
  // 绘制验证码
  const generateRandomCode = (ctx: CanvasRenderingContext2D) => {
    var code = ''
    for (var i = 0; i < props.count; i++) {
      const item = props.identifyCode.charAt(Math.floor(Math.random() * props.identifyCode.length))
      ctx.fillStyle = getRandomColor(0, 255)
      ctx.font = getRandomNumber(props.fontSizeMin, props.fontSizeMax) + 'px SimHei'
      let x = (i + 1) * (props.width / (props.count + 1))
      let y = getRandomNumber(props.fontSizeMax, props.height - 5)
      var deg = getRandomNumber(-30, 30)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(item, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
      code += item
    }

    emits('change', code)
  }

  // 绘制干扰点
  const generateDot = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < props.dotCount; i++) {
      ctx.fillStyle = getRandomColor(0, 255)
      ctx.beginPath()
      ctx.arc(getRandomNumber(0, props.width), getRandomNumber(0, props.height), 1, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
  // 绘制干扰线
  const generateLine = (ctx: CanvasRenderingContext2D) => {
    for (var i = 0; i < props.lineCount; i++) {
      ctx.strokeStyle = getRandomColor(0, 255)
      ctx.beginPath()
      ctx.moveTo(getRandomNumber(0, props.width), getRandomNumber(0, props.height))
      ctx.lineTo(getRandomNumber(0, props.width), getRandomNumber(0, props.height))
      ctx.stroke()
    }
  }
  // 抛出刷新验证码
  defineExpose({
    generateCaptcha
  })
</script>
<style lang="scss" scoped></style>
