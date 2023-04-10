import { FC } from 'react'

import { useMinifigsStatisticsQuery } from 'api/minifigs'
import { useFilters } from 'components/Filters/useFilters'

import MinifigsList from './components/MinifigsList'
import MinifigsMenu from './components/MinifigsMenu'
import {
  getMinifigFilterConfigs,
  minfigsInitialFilters,
  MinifigsFiltersContext,
} from './hooks/useMinifigsFilters'

export const Minifigs: FC = () => {
  const { data, isLoading } = useMinifigsStatisticsQuery()

  const filtersController = useFilters<keyof typeof minfigsInitialFilters>({
    filterConfigs: getMinifigFilterConfigs(data),
    initialFilters: minfigsInitialFilters,
    dataIsLoading: isLoading,
  })

  if (isLoading) return null

  return (
    <MinifigsFiltersContext.Provider value={filtersController}>
      <MinifigsMenu />
      <MinifigsList />
    </MinifigsFiltersContext.Provider>
  )
}

export default Minifigs
