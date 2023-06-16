import type { Plugin } from 'vite'
import dayjs, { Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { green, blue, bold } from 'picocolors'
dayjs.extend(duration)

function viteBuildInfo(): Plugin {
  let config: { command: string }
  let startTime: Dayjs
  let endTime: Dayjs
  return {
    name: 'vite:buildInfo',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    buildStart() {
      console.log(
        bold(
          green(
            `👏欢迎使用${blue(
              '[vue-answer-admin]'
            )}，如果您感觉不错，记得点击后面链接给个star哦💖 https://github.com/AnswerYYY/vue-answer-admin`
          )
        )
      )
      if (config.command === 'build') {
        startTime = dayjs(new Date())
      }
    },
    closeBundle() {
      if (config.command === 'build') {
        endTime = dayjs(new Date())
        console.log(
          bold(
            green(
              `🎉恭喜打包完成（总用时${dayjs.duration(endTime.diff(startTime)).format('mm分ss秒')}`
            )
          )
        )
      }
    }
  }
}

export default viteBuildInfo
