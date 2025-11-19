import AuthPage from '@/views/AuthPage.vue'
import IndexPage from '@/views/IndexPage.vue'
import TestPage from '@/views/TestPage.vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // Root Pages
  {
    path: '/',
    component: IndexPage,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      // Home Page
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue'),
      },
    ],
  },

  // Auth Pages
  {
    path: '/auth',
    // beforeEnter: guestOnly,
    component: AuthPage,
    children: [
      {
        path: '',
        redirect: '/auth/login',
      },
      {
        path: 'login',
        component: () => import('@/views/LoginPage.vue'),
      },
    ],
  },

  // Component Testing Page
  {
    path: '/test',
    component: TestPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
