import { FC, useMemo } from 'react'
import { Skeleton } from '@mui/material'
import { setsSearchSchema } from 'routes'

import { useSetsQuery } from 'api/sets'
import { useFilters } from 'components/Filters/useFilters'
import { getFilteredSetsList, getSetsListStatistics } from 'utils/sets'

import SetsList from './components/SetsList'
import SetsMenu from './components/SetsMenu'
import { getSetFilterConfigs, SetsFiltersContext, setsInitialFilters } from './hooks/useSetsFilters'

export const Sets: FC = () => {
  const { data, isLoading } = useSetsQuery()
  const filterConfigs = useMemo(
    () => getSetFilterConfigs(getSetsListStatistics(data ?? [])),
    [data]
  )
  const filtersController = useFilters<keyof typeof setsInitialFilters>({
    filterConfigs,
    initialFilters: setsInitialFilters,
    dataIsLoading: isLoading,
    searchSchema: setsSearchSchema,
    getQuantities: (filterValues) => ({
      total: data?.length ?? 0,
      filteredTotal: getFilteredSetsList(data ?? [], filterValues).length,
    }),
    searchPath: '/sets',
  })

  if (isLoading) return <Skeleton variant="rectangular" height="calc(100vh - 48px)" />

  return (
    <SetsFiltersContext.Provider value={filtersController}>
      <SetsMenu />
      <SetsList />
    </SetsFiltersContext.Provider>
  )
}

export default Sets
