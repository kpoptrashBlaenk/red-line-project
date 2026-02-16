import DefaultLayout from '@/components/layouts/default/DefaultLayout.vue'
import { authOnly } from '@/middleware/auth'
import { guestOnly } from '@/middleware/guest'
import restore from '@/middleware/restore'
import AccountPage from '@/views/AccountPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import CategoriesPage from '@/views/CategoriesPage.vue'
import CategoryPage from '@/views/CategoryPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import ForgotPasswordPage from '@/views/ForgotPasswordPage.vue'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import ProductsPage from '@/views/ProductsPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import ResetPasswordPage from '@/views/ResetPasswordPage.vue'
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
        path: 'account',
        component: AccountPage,
        beforeEnter: authOnly,
      },
      {
        path: 'categories',
        component: CategoriesPage,
      },
      {
        path: 'category/:id',
        component: CategoryPage,
      },
      {
        path: 'products',
        component: ProductsPage,
      },
      {
        path: 'product/:id',
        component: ProductPage,
      },
      {
        path: 'checkout',
        component: CheckoutPage,
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
      {
        path: 'forgot-password',
        component: ForgotPasswordPage,
        beforeEnter: guestOnly,
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordPage,
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
let basePosition: number | null = null

router.beforeEach((to, from, next) => {
  if (!basePosition) {
    basePosition = router.options.history.state.position as number

    if (to.fullPath !== '/home') {
      next({
        path: '/home',
        query: {
          redirect: to.fullPath,
        },
      })

      return
    }
  }

  lastRoute = from.fullPath

  next()
})

export function getLastRoute() {
  return lastRoute
}

export function getBasePosition() {
  return basePosition
}

export default router
