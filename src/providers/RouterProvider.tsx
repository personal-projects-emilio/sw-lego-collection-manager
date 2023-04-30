import { FC } from 'react'
import { RouterProvider as OriginalRouterProvider } from '@tanstack/router'
import { broswerHistory, router } from 'routes'

const RouterProvider: FC = () => <OriginalRouterProvider router={router} history={broswerHistory} />

export default RouterProvider
