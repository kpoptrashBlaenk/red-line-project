import DefaultLayout from '@/components/layouts/default/DefaultLayout.vue'
import { authOnly } from '@/middleware/auth'
import { guestOnly } from '@/middleware/guest'
import restore from '@/middleware/restore'
import AdminPage from '@/views/AdminPage.vue'
import CategoryPage from '@/views/CategoryPage.vue'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
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
    beforeEnter: restore,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'admin',
        component: AdminPage,
        beforeEnter: authOnly,
      },
      {
        path: 'category/:id',
        component: CategoryPage,
      },
      {
        path: 'product/:id',
        component: ProductPage,
      },
      {
        path: 'register',
        component: RegisterPage,
        beforeEnter: guestOnly,
      },
      {
        path: 'login',
        component: LoginPage,
        beforeEnter: guestOnly,
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

let lastRoute: string | null = null

router.beforeEach((to, from, next) => {
  lastRoute = from.fullPath
  next()
})

export function getLastRoute() {
  return lastRoute
}

export default router
