import { createBrowserHistory, RootRoute, Route, Router } from '@tanstack/router'

import Layout from 'components/Layout'
import Auth from 'pages/Auth'
import Minifigs from 'pages/Minifigs'
import Sets from 'pages/Sets'

import { minifigsSearchSchema, setsSearchSchema } from './search'
export * from './search'

const rootRoute = new RootRoute({ component: Layout })
const minifigsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Minifigs,
  validateSearch: minifigsSearchSchema,
})
const setsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sets',
  component: Sets,
  validateSearch: setsSearchSchema,
})
const loginRoute = new Route({ getParentRoute: () => rootRoute, path: '/auth', component: Auth })

const routeTree = rootRoute.addChildren([minifigsRoute, setsRoute, loginRoute])

export const router = new Router({
  routeTree,
  basepath: '/sw-lego-collection-manager',
})

export type RoutesPath = Exclude<keyof typeof router.routesById, '__root__'>

export const broswerHistory = createBrowserHistory()

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}
