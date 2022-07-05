// 创建路由对象
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
const router = createRouter({
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ],
  history: createWebHashHistory()
})

export default router