import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import TestPage from '@/views/TestPage.vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  // Home Page
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: HomePage,
  },

  // Auth Pages
  {
    path: '/login',
    component: LoginPage,
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
