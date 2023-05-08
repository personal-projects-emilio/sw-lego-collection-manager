import { useQuery } from '@tanstack/react-query'
import { queryKeys } from 'constants/api'

import { queryClient } from 'providers/QueryClientProvider'
import { MinifigsList } from 'types/minifigs'

import api from './index'

// We add the auth token for mutation queries
api.interceptors.request.use((config) => {
  const idToken = localStorage.getItem('idToken')
  if (config.method?.toLowerCase() !== 'get' && idToken) {
    config.params = {
      auth: idToken,
    }
  }
  return config
})

export const fetchMinifigs = () => api.get<MinifigsList>('/minifigs.json').then((res) => res.data)

export const mutateMinifigs = async (data: MinifigsList) => await api.put(`/minifigs.json`, data)

// Refetch the minifigs (after a mutation)
export const invalidateMinifigsQuery = () =>
  queryClient.invalidateQueries({ queryKey: [queryKeys.minifigs] })

// Used to update local query cache for non authorized users
export const setMinifigsQueryData = (data: MinifigsList) =>
  queryClient.setQueryData([queryKeys.minifigs], () => data)

export const useMinifigsQuery = () =>
  useQuery({
    queryKey: [queryKeys.minifigs],
    queryFn: fetchMinifigs,
  })
