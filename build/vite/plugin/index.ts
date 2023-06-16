import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { PluginOption } from 'vite'
import { configMockPlugin } from './mock'
import { svgBuilder } from '../../../src/components/icon/svg/index'
import viteBuildInfo from './info'
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    viteBuildInfo(),
    svgBuilder('./src/assets/icons/')
  ]
  const { VITE_USE_MOCK } = viteEnv
  if (VITE_USE_MOCK) {
    vitePlugins.push(configMockPlugin(isBuild))
  }
  return vitePlugins
}
