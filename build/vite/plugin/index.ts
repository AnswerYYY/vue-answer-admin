import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { PluginOption } from 'vite'
import { configMockPlugin } from './mock'
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx()
  ]
  const { VITE_USE_MOCK } = viteEnv
  if (VITE_USE_MOCK) {
    vitePlugins.push(configMockPlugin(isBuild))
  }
  return vitePlugins
}
