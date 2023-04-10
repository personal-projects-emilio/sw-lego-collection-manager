import { useQuery } from '@tanstack/react-query'
import { queryKeys } from 'constants/api'

import { MinifigsList } from 'types/minifigs'
import { getMinifigsListStatistics } from 'utils/minifigs'

import api from './index'

export const fetchMinifigs = () => api.get<MinifigsList>('/minifigs.json').then((res) => res.data)

export const useMinifigsQuery = () =>
  useQuery({
    queryKey: [queryKeys.minifigs],
    queryFn: fetchMinifigs,
  })

export const useMinifigsStatisticsQuery = () => {
  const { data, ...other } = useMinifigsQuery()

  return {
    data: data && getMinifigsListStatistics(data),
    ...other,
  }
}
