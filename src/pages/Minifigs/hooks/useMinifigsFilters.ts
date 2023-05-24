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
  const timelineOptions = formatOptionsFromLabelAndAmout(stats?.timelines, true)
  const appearanceOptions = formatOptionsFromLabelAndAmout(stats?.appearances, true)

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
    timeline: makeSelect({
      label: 'Timeline',
      defaultValue: undefined,
      options: timelineOptions ?? [],
    }),
    appearance: makeSelect({
      label: 'Appearance',
      defaultValue: undefined,
      options: appearanceOptions ?? [],
    }),
  }
}

export const minfigsInitialFilters = {
  display: displayOptions[0],
  tag: undefined,
  characterName: undefined,
  timeline: undefined,
  appearance: undefined,
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
  handleResetFilters: () => undefined,
  quantities: {
    total: 0,
    filteredTotal: 0,
  },
})

export const useMinifigsFilters = () => useContext(MinifigsFiltersContext)

export default useMinifigsFilters
