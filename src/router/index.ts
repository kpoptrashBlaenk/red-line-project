import DefaultLayout from '@/components/layouts/default/DefaultLayout.vue'
import { authOnly } from '@/middleware/auth'
import { guestOnly } from '@/middleware/guest'
import restore from '@/middleware/restore'
import NotFoundPage from '@/views/404Page.vue'
import AccountPage from '@/views/AccountPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import CategoriesPage from '@/views/CategoriesPage.vue'
import CategoryPage from '@/views/CategoryPage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import ForgotPasswordPage from '@/views/ForgotPasswordPage.vue'
import GeneralConditionsPage from '@/views/GeneralConditionsPage.vue'
import HomePage from '@/views/HomePage.vue'
import LegalMentionsPage from '@/views/LegalMentionsPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import OfflinePage from '@/views/OfflinePage.vue'
import ProductPage from '@/views/ProductPage.vue'
import ProductsPage from '@/views/ProductsPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import ResetPasswordPage from '@/views/ResetPasswordPage.vue'
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
        path: 'contact',
        component: ContactPage,
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
        path: 'legal-mentions',
        component: LegalMentionsPage,
      },
      {
        path: 'general-conditions',
        component: GeneralConditionsPage,
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

  {
    path: '/offline',
    component: OfflinePage,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

let lastRoute: string | null = null
let basePosition: number | null = null

router.beforeEach((to, from, next) => {
  // if not online go to offline page
  if (!navigator.onLine) {
    next('/offline')
    return
  }

  // if going to offline, but user is online, go home
  if (to.fullPath === '/offline') {
    next('/home')
    return
  }

  if (!basePosition) {
    basePosition = router.options.history.state.position as number

    if (to.fullPath !== '/home' && to.fullPath !== '/offline' && from.path !== '/home') {
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
