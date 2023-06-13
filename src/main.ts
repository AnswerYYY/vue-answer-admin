import { createApp } from 'vue'
import App from './App.vue'

// ElementPlus
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// Vue-Router
import router from './router'
import './router/permission' // permission control

// Pinia
import { setupStore } from './store'

// 自定义指令
import directives from '@/directives'

// 通用样式
import '@/styles/index.scss'

const app = createApp(App)

// 注册icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载pinia
setupStore(app)

app.use(ElementPlus).use(router).use(directives)
app.mount('#app')
