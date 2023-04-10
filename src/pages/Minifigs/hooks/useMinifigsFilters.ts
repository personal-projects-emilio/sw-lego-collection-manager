import { createContext, useContext } from 'react'
import { displayOptions } from 'constants/options'

import { useFilters } from 'components/Filters/useFilters'
import { makeRadioGroup } from 'components/Filters/utils/makeRadioGroup'
import { makeSelect } from 'components/Filters/utils/makeSelect'
import { MinifigsListStatistics } from 'types/minifigs'
import { formatOptionsFromLabelAndAmout } from 'utils/filters'

export const getMinifigFilterConfigs = (stats?: MinifigsListStatistics) => {
  const tagOptions = formatOptionsFromLabelAndAmout(stats?.tags, true)
  const characterNameOptions = formatOptionsFromLabelAndAmout(stats?.characterNames, true)

  return {
    display: makeRadioGroup({
      label: 'Display',
      defaultValue: displayOptions[0],
      isMandatory: true,
      options: displayOptions,
    }),
    tag: makeSelect({
      label: 'Tag',
      defaultValue: undefined,
      options: tagOptions ?? [],
    }),
    characterName: makeSelect({
      label: 'Character Name',
      defaultValue: undefined,
      options: characterNameOptions ?? [],
    }),
  }
}

export const minfigsInitialFilters = {
  display: displayOptions[0],
  tag: undefined,
  characterName: undefined,
}

export type MinifigFiltersContextProps = ReturnType<
  typeof useFilters<keyof typeof minfigsInitialFilters>
>
export const MinifigsFiltersContext = createContext<MinifigFiltersContextProps>({
  filterConfigs: getMinifigFilterConfigs(undefined),
  filterPreloaded: false,
  filters: minfigsInitialFilters,
  filtersValues: {},
  initialFilters: minfigsInitialFilters,
  onChange: () => undefined,
  handleApplyFilter: () => undefined,
  handleDeleteFilter: () => undefined,
})

export const useMinifigsFilters = () => useContext(MinifigsFiltersContext)

export default useMinifigsFilters
