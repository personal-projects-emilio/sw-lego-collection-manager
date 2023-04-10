import { FC, PropsWithChildren } from 'react'
import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
} from '@tanstack/react-query'

export const queryClient = new QueryClient()

const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => (
  <OriginalQueryClientProvider client={queryClient}>{children}</OriginalQueryClientProvider>
)

export default QueryClientProvider
