import { FC } from 'react'
import { Skeleton } from '@mui/material'
import { minifigsSearchSchema } from 'routes'

import { useMinifigsQuery } from 'api/minifigs'
import { useFilters } from 'components/Filters/useFilters'
import { getFilteredMinifigsList, getMinifigsListStatistics } from 'utils/minifigs'

import MinifigsList from './components/MinifigsList'
import MinifigsMenu from './components/MinifigsMenu'
import {
  getMinifigFilterConfigs,
  minfigsInitialFilters,
  MinifigsFiltersContext,
} from './hooks/useMinifigsFilters'

export const Minifigs: FC = () => {
  const { data, isLoading } = useMinifigsQuery()
  const filtersController = useFilters<keyof typeof minfigsInitialFilters>({
    filterConfigs: getMinifigFilterConfigs(getMinifigsListStatistics(data ?? [])),
    initialFilters: minfigsInitialFilters,
    dataIsLoading: isLoading,
    searchSchema: minifigsSearchSchema,
    getQuantities: (filterValues) => ({
      total: data?.length ?? 0,
      filteredTotal: getFilteredMinifigsList(data ?? [], filterValues).length,
    }),
  })

  if (isLoading) return <Skeleton variant="rectangular" height="calc(100vh - 48px)" />

  return (
    <MinifigsFiltersContext.Provider value={filtersController}>
      <MinifigsMenu />
      <MinifigsList />
    </MinifigsFiltersContext.Provider>
  )
}

export default Minifigs
