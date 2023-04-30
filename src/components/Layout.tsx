import { FC, lazy } from 'react'
import { Outlet } from '@tanstack/router'
import { env } from 'env'

import { AuthProvider } from 'providers'

import Header from './Header'

const DevTools =
  env.MODE === 'production'
    ? {
        // No dev tools in production
        Router: () => null,
        Query: () => null,
      }
    : {
        // Lazy load in development
        Router: lazy(() =>
          import('@tanstack/router-devtools').then((res) => ({
            default: res.TanStackRouterDevtools,
          }))
        ),
        Query: lazy(() =>
          import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((res) => ({
            default: res.ReactQueryDevtools,
          }))
        ),
      }

export const Layout: FC = () => {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
      <DevTools.Router initialIsOpen={false} />
      <DevTools.Query initialIsOpen={false} position="bottom-right" />
    </AuthProvider>
  )
}

export default Layout
