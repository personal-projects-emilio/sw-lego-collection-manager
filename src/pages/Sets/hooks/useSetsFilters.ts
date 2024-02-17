import { createContext, useContext } from 'react'
import { displayOptions } from 'constants/options'

import { useFilters } from 'components/Filters/useFilters'
import { makeAutocomplete } from 'components/Filters/utils/makeAutocomplete'
import { makeRadioGroup } from 'components/Filters/utils/makeRadioGroup'
import { makeTextfield } from 'components/Filters/utils/makeTextfield'
import { SetsListStatistics } from 'types/sets'
import { formatOptionsFromLabelAndAmout } from 'utils/filters'

export const getSetFilterConfigs = (stats?: SetsListStatistics) => {
  return {
    display: makeRadioGroup({
      label: 'Display',
      defaultValue: displayOptions[0],
      isMandatory: true,
      options: displayOptions,
    }),
    tag: makeAutocomplete({
      label: 'Tag',
      options: formatOptionsFromLabelAndAmout(stats?.tags, true) ?? [],
    }),
    timeline: makeAutocomplete({
      label: 'Timeline',
      options: formatOptionsFromLabelAndAmout(stats?.timelines, true) ?? [],
    }),
    appearance: makeAutocomplete({
      label: 'Appearance',
      options: formatOptionsFromLabelAndAmout(stats?.appearances, true) ?? [],
    }),
    subtheme: makeAutocomplete({
      label: 'Subtheme',
      options: formatOptionsFromLabelAndAmout(stats?.subthemes, true) ?? [],
    }),
    releaseYear: makeAutocomplete({
      label: 'Release Year',
      options: formatOptionsFromLabelAndAmout(stats?.releaseYear) ?? [],
    }),
    search: makeTextfield({
      label: 'Search',
    }),
  }
}

export const setsInitialFilters = {
  display: displayOptions[0],
  tag: undefined,
  timeline: undefined,
  appearance: undefined,
  subtheme: undefined,
  search: undefined,
  releaseYear: undefined,
}

export type SetFiltersContextProps = ReturnType<typeof useFilters<keyof typeof setsInitialFilters>>
export const SetsFiltersContext = createContext<SetFiltersContextProps>({
  filterConfigs: getSetFilterConfigs(undefined),
  filterPreloaded: false,
  filters: setsInitialFilters,
  filtersValues: {},
  initialFilters: setsInitialFilters,
  onChange: () => undefined,
  handleApplyFilter: () => undefined,
  handleDeleteFilter: () => undefined,
  handleResetFilters: () => undefined,
  quantities: {
    total: 0,
    filteredTotal: 0,
  },
})

export const useSetsFilters = () => useContext(SetsFiltersContext)

export default useSetsFilters
