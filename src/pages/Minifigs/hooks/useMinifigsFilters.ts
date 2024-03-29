import { createContext, useContext } from 'react'
import { displayOptions } from 'constants/options'

import { useFilters } from 'components/Filters/useFilters'
import { makeAutocomplete } from 'components/Filters/utils/makeAutocomplete'
import { makeRadioGroup } from 'components/Filters/utils/makeRadioGroup'
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
    tag: makeAutocomplete({
      label: 'Tag',
      defaultValue: undefined,
      options: tagOptions ?? [],
    }),
    characterName: makeAutocomplete({
      label: 'Character Name',
      defaultValue: undefined,
      options: characterNameOptions ?? [],
    }),
    timeline: makeAutocomplete({
      label: 'Timeline',
      defaultValue: undefined,
      options: timelineOptions ?? [],
    }),
    appearance: makeAutocomplete({
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
