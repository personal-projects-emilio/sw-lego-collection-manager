import { useQuery } from '@tanstack/react-query'
import { endPoints, queryKeys } from 'constants/api'

import { queryClient } from 'providers/QueryClientProvider'
import { SetsList } from 'types/sets'

import api from './index'

export const fetchSets = () => api.get<SetsList>(endPoints.sets).then((res) => res.data)

export const mutateSets = async (data: SetsList) => await api.put(endPoints.sets, data)

// Refetch the minifigs (after a mutation)
export const invalidateSetsQuery = () =>
  queryClient.invalidateQueries({ queryKey: [queryKeys.sets] })

// Used to update local query cache for non authorized users
export const setSetsQueryData = (data: SetsList) => queryClient.setQueryData([queryKeys.sets], data)

export const useSetsQuery = () =>
  useQuery({
    queryKey: [queryKeys.sets],
    queryFn: fetchSets,
  })
