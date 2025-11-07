import { useUserStore } from '@/stores/user'
import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'

export async function guestOnly(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
  const userStore = useUserStore()

  //  if no user then try to restore
  if (!userStore.user) {
    await userStore.restoreSession()
  }

  // if user then redirect to index
  if (userStore.user) {
    next({ path: '/' })
    return
  }

  next()
}
