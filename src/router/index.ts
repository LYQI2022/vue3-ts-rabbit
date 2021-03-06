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
        },
        {
          path: 'playground',
          component: () => import('@/views/playground/index.vue')
        },
        {
          path: '/goods/:id',
          component: () => import('@/views/goods/index.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ],
  history: createWebHashHistory(),
  scrollBehavior: () => {
    return {
      top: 0,
    }
  },
})

export default router