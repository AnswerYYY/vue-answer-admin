/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { resolve } from 'path'
import { createVitePlugins } from './build/vite/plugin'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // loadEnv读取为字符串，将类型转换为正确类型
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT } = viteEnv

  const isBuild = command === 'build'
  return {
    root,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/'
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      open: true,
      https: false,
      // 启用本地IP
      host: true,
      port: VITE_PORT
    }
  }
}
