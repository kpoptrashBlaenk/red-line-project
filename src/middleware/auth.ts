import { useUserStore } from '@/stores/user'
import handleRoute from '@/utils/handleRoute'
import {
  useRoute,
  useRouter,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
} from 'vue-router'

export async function authOnly(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
  const userStore = useUserStore()

  //  if still no user then redirect
  if (!userStore.user) {
    handleRoute(useRoute(), useRouter(), '/login')
    next('/login')
    return
  }

  next()
}
