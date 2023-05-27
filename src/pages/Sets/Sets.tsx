import { FC, useEffect, useMemo } from 'react'
import { Skeleton } from '@mui/material'

import { useSetsQuery } from 'api/sets'

// import { minifigsSearchSchema } from 'routes'
// import { useFilters } from 'components/Filters/useFilters'
// import { getFilteredMinifigsList, getMinifigsListStatistics } from 'utils/minifigs'
import SetsList from './components/SetsList'
import SetsMenu from './components/SetsMenu'
// import {
//   getSetFilterConfigs,
//   minfigsInitialFilters,
//   MinifigsFiltersContext,
// } from './hooks/useSetsFilters'

export const Sets: FC = () => {
  const { data, isLoading } = useSetsQuery()
  // const filterConfigs = useMemo(
  //   () => getSetFilterConfigs(getMinifigsListStatistics(data ?? [])),
  //   [data]
  // )
  // const filtersController = useFilters<keyof typeof minfigsInitialFilters>({
  //   filterConfigs,
  //   initialFilters: minfigsInitialFilters,
  //   dataIsLoading: isLoading,
  //   searchSchema: minifigsSearchSchema,
  //   getQuantities: (filterValues) => ({
  //     total: data?.length ?? 0,
  //     filteredTotal: getFilteredMinifigsList(data ?? [], filterValues).length,
  //   }),
  // })
  useEffect(() => {
    console.log(data)
    // const newFormatSet = data.
  }, [])

  if (isLoading) return <Skeleton variant="rectangular" height="calc(100vh - 48px)" />

  return (
    // <MinifigsFiltersContext.Provider value={filtersController}>
    <>
      <SetsMenu />
      <SetsList />
    </>
    // </MinifigsFiltersContext.Provider>
  )
}

export default Sets
