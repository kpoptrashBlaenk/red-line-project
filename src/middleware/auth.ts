import { useUserStore } from '@/stores/user'
import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'

export async function authOnly(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
  const userStore = useUserStore()

  //  if no user then try to restore
  if (!userStore.user) {
    await userStore.restoreSession()
  }

  //  if still no user then redirect
  if (!userStore.user) {
    next({ path: '/auth' })
    return
  }

  next()
}
