import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import router from './router'
import './router/permission' // permission control
import { setupStore } from './store'

import '@/styles/index.scss'
const app = createApp(App)
setupStore(app)

app.use(ElementPlus).use(router)
app.mount('#app')
