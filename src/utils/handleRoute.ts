import { getLastRoute } from '@/router'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'

const home = '/home'
const linearRoutes = [home, '/category', '/product', '/products', '/categories']
// const nonLinearRoutes = ['/admin']

export default function (route: RouteLocationNormalizedLoaded, router: Router, url: string, before?: () => void) {
  before?.()

  // if going to home & last route is home, go back
  if (url.startsWith(home) && getLastRoute()?.startsWith(home)) {
    router.back()
    return
  }

  // if going to home & last route is not home, go back to first and replace with home
  if (url.startsWith(home)) {
    router.options.history.go(-router.options.history.state.position! + 1)
    router.replace(home)
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
