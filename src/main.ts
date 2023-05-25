import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import router from './router'
import './router/permission' // permission control
import { setupStore } from './store'

import 'tailwindcss/tailwind.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
setupStore(app)

app.use(ElementPlus).use(router)
app.mount('#app')
