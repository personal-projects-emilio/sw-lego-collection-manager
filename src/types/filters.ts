import { ReactElement } from 'react'

import { Option } from './common'

export interface FiltersController<
  K extends string = string,
  C extends Record<K, FilterConfig> = Record<K, FilterConfig>,
  F extends Record<K, C[K]['defaultValue']> = Record<K, C[K]['defaultValue']>,
  FV extends Partial<Record<K, ReturnType<C[K]['getValues']>>> = Partial<
    Record<K, ReturnType<C[K]['getValues']>>
  >
> {
  filterConfigs: C
  filters: F
  filtersValues: FV
  filterPreloaded: boolean
  initialFilters: F
  onChange: (newFilters: F) => void
  handleDeleteFilter: (filterName: K) => void
  handleApplyFilter: (filterName: K, value: F[K]) => void
}

export type FilterComponent<O, V> = (props: {
  option?: V
  onChange: (option?: O) => void
}) => ReactElement

export interface FilterConfig<O extends Option = Option, V extends undefined | O | O[] = O> {
  // name: string
  label: string
  component: FilterComponent<O, V>
  isMandatory?: boolean
  defaultValue?: V
  displayChip: (option: V) => boolean
  chipLabel: (option: V) => string | undefined
  getValues: (option: V) => V extends O[] ? O['value'][] : O['value']
  options?: O[]
  inputType?: 'checkbox' | 'radio' | 'select'
}

export interface CheckboxFilterConfig extends FilterConfig<Option<string>, Option<string>[]> {
  inputType: 'checkbox'
  options: Option<string>[]
}

export interface RadioFilterConfig extends FilterConfig<Option<string>, Option<string>> {
  inputType: 'radio'
  options: Option<string>[]
}
export interface SelectFilterConfig extends FilterConfig<Option<string>, Option<string>> {
  inputType: 'select'
  options: Option<string>[]
}

export type Display = 'all' | 'missing' | 'owned'
