import AuthPage from '@/views/AuthPage.vue'
import IndexPage from '@/views/IndexPage.vue'
import TestPage from '@/views/TestPage.vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // Index Page
  {
    path: '/',
    component: IndexPage,
    // beforeEnter: authOnly,
  },

  // Auth Page
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
