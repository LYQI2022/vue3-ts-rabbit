// 创建路由对象
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
const router = createRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '', // 默认路由, 访问 / 等于先加载 Layout 再加载这个组件
          component: Home
        },
        {
          path: '/category/:id',
          component: () => import('@/views/category/index.vue')
        },
        {
          path: '/category/sub/:id',
          component: () => import('@/views/category/sub.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ],
  history: createWebHashHistory()
})

export default router