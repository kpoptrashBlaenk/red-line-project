import DefaultLayout from '@/components/layouts/default/DefaultLayout.vue'
import AdminPage from '@/views/AdminPage.vue'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import TestPage from '@/views/TestPage.vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home',
  },

  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'admin',
        component: AdminPage,
      },
    ],
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
