import { ReactElement } from 'react'
import z from 'zod'

import { Option } from './common'
export type FiltersController<
  Key extends string = string,
  Configs extends Record<Key, FilterConfig> = Record<Key, FilterConfig>,
  Filters extends Record<Key, Configs[Key]['defaultValue']> = Record<
    Key,
    Configs[Key]['defaultValue']
  >,
  FilterValues extends Partial<Record<Key, ReturnType<Configs[Key]['getValues']>>> = Partial<
    Record<Key, ReturnType<Configs[Key]['getValues']>>
  >
> = {
  filterConfigs: Configs
  filters: Filters
  filtersValues: FilterValues
  filterPreloaded: boolean
  initialFilters: Filters
  onChange: (newFilters: Filters) => void
  handleDeleteFilter: (filterName: Key) => void
  handleApplyFilter: (filterName: Key, value: Filters[Key]) => void
  handleResetFilters: () => void
  quantities: {
    total: number
    filteredTotal: number
  }
}

export type FilterComponent<O, V> = (props: {
  option?: V
  onChange: (option?: O) => void
}) => ReactElement

export type FilterConfig<O extends Option = Option, V extends undefined | O | O[] = O> = {
  // name: string
  label: string
  component: FilterComponent<O, V>
  isMandatory?: boolean
  defaultValue?: V
  displayChip: (option: V) => boolean
  chipLabel: (option: V) => string | undefined
  getValues: (option: V) => V extends O[] ? O['value'][] : O['value']
  options?: O[]
  inputType?: 'checkbox' | 'radio' | 'select' | 'autocomplete' | 'textfield'
}

export type CheckboxFilterConfig = FilterConfig<Option<string>, Option<string>[]> & {
  inputType: 'checkbox'
  options: Option<string>[]
}

export type RadioFilterConfig = FilterConfig<Option<string>, Option<string>> & {
  inputType: 'radio'
  options: Option<string>[]
}
export type SelectFilterConfig = FilterConfig<Option<string>, Option<string>> & {
  inputType: 'select'
  options: Option<string>[]
}

export type AutocompleteFilterConfig = FilterConfig<Option<string>, Option<string>> & {
  inputType: 'autocomplete'
  options: Option<string>[]
}

export type TextfieldFilterConfig = FilterConfig<Option<string>, Option<string>> & {
  inputType: 'textfield'
}

export const zDisplay = z.union([z.literal('all'), z.literal('missing'), z.literal('owned')])
export type Display = z.infer<typeof zDisplay>
