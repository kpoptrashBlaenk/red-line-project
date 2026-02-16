import { getBasePosition, getLastRoute } from '@/router'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'

const home = '/home'
const linearRoutes = [home, '/category', '/product', '/categories', '/products']
// const nonLinearRoutes = ['/admin', 'login', '/register', '/login', '/forgot-password', '/reset-password']

export default async function (route: RouteLocationNormalizedLoaded, router: Router, url: string, before?: () => void) {
  before?.()
  const delta = -(router.options.history.state.position as number) + getBasePosition()!

  // if not moving, do nothing
  if (route.fullPath === url) {
    return
  }

  // if going to home & last route is home, go back
  if (url.startsWith(home) && getLastRoute()?.startsWith(home)) {
    router.back()
    return
  }

  // if going to home & last route is not home, go back to first
  if (url.startsWith(home)) {
    router.options.history.go(delta)

    return
  }

  // if from home, push
  if (route.fullPath.startsWith(home)) {
    router.push(url)
    return
  }

  // if from linear routes, push
  if (linearRoutes.some((r) => route.fullPath.startsWith(r))) {
    router.push(url)
    return
  }

  // default, replace
  router.replace(url)
}

// ### NOTES ###
// Linear pages push to the stack, while non-linear pages replace the current route if the current route is also non-linear
// When clicking home, in every case, the route should be cleared and navigated back
