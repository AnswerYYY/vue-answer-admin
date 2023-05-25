import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { resolve } from 'path'
import { createVitePlugins } from './build/vite/plugin'

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

/** 设置别名 */
const alias: Record<string, string> = {
  '@': pathResolve('src')
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
      alias
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
