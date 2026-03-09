import { useAuth } from '@/composables/auth'
import { useUserStore } from '@/stores/user'
import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'

export default async function (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) {
  const userStore = useUserStore()
  const { restore } = useAuth()

  //  if no user then try to restore
  if (!userStore.user) {
    await restore()
  }

  next()
}
