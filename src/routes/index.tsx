import { createBrowserHistory, RootRoute, Route, Router } from '@tanstack/router'
import z from 'zod'

import Layout from 'components/Layout'
import Auth from 'pages/Auth'
import Minifigs from 'pages/Minifigs'
import { zDisplay } from 'types/filters'

export const minifigsSearchSchema = z.object({
  appearance: z.string().optional(),
  characterName: z.string().optional(),
  display: zDisplay.default('all'),
  tag: z.string().optional(),
  timeline: z.string().optional(),
})

export type MinifigsSearch = z.infer<typeof minifigsSearchSchema>

const rootRoute = new RootRoute({ component: Layout })
const minifigsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Minifigs,
  validateSearch: minifigsSearchSchema,
})
const loginRoute = new Route({ getParentRoute: () => rootRoute, path: '/auth', component: Auth })

const routeTree = rootRoute.addChildren([minifigsRoute, loginRoute])

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
