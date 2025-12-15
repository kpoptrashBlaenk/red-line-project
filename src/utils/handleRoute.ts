import { getLastRoute } from '@/router'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'

export default function (route: RouteLocationNormalizedLoaded, router: Router, url: string, before?: () => void) {
  before?.()

  // push from home if current = home
  if (route.fullPath.startsWith('/home')) {
    router.push(url)
    return
  }

  // if going to home & last route exists
  if (url.startsWith('/home') && getLastRoute()) {
    router.back()
    return
  }

  router.replace(url)
}
