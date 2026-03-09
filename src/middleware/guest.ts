import { useUserStore } from '@/stores/user'
import handleRoute from '@/utils/handleRoute'
import {
  useRoute,
  useRouter,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
} from 'vue-router'

export async function guestOnly(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
  const userStore = useUserStore()

  // if user then redirect to index
  if (userStore.user) {
    handleRoute(useRoute(), useRouter(), '/')
    next('/')
    return
  }

  next()
}
