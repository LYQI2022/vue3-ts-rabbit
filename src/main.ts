import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/styles/common.less'

// 引入路由并挂载
import router from '@/router/index'

// 引入 pinia 并挂载
import { createPinia } from 'pinia'
const pinia = createPinia()

import MyUI from './components/index'
const app = createApp(App)

// createApp(App).use(router).use(pinia).mount('#app')
app.use(MyUI)
app.use(router)
app.use(pinia)
app.mount('#app')
