import { useEffect, useState } from 'react'
import { useNavigate, useSearch } from '@tanstack/router'
import { RoutesPath } from 'routes'
import { ZodObject, ZodRawShape } from 'zod'

import { FilterConfig, FiltersController } from 'types/filters'

type UseFiltersProps<
  Key extends string = string,
  Configs extends Record<Key, FilterConfig> = Record<Key, FilterConfig>,
  Filters extends Record<Key, Configs[Key]['defaultValue']> = Record<
    Key,
    Configs[Key]['defaultValue']
  >,
  SearchSchema extends ZodRawShape = ZodRawShape,
> = {
  filterConfigs: Configs
  initialFilters: Filters
  dataIsLoading?: boolean
  searchSchema?: ZodObject<SearchSchema>
  getQuantities: (filterValues: Partial<Record<Key, ReturnType<Configs[Key]['getValues']>>>) => {
    total: number
    filteredTotal: number
  }
  searchPath: RoutesPath
}

export const useFilters = <
  Key extends string = string,
  Configs extends Record<Key, FilterConfig> = Record<Key, FilterConfig>,
  Filters extends Record<Key, Configs[Key]['defaultValue']> = Record<
    Key,
    Configs[Key]['defaultValue']
  >,
  FilterValues extends Partial<Record<Key, ReturnType<Configs[Key]['getValues']>>> = Partial<
    Record<Key, ReturnType<Configs[Key]['getValues']>>
  >,
>({
  filterConfigs,
  initialFilters,
  dataIsLoading = false,
  searchSchema,
  getQuantities,
  searchPath,
}: UseFiltersProps<Key, Configs, Filters>): FiltersController<
  Key,
  Configs,
  Filters,
  FilterValues
> => {
  const getFiltersValues = (filters: Filters) => {
    return (Object.keys(filters) as Key[]).reduce((acc, curr) => {
      const currentValue = filters[curr]
      return {
        ...acc,
        [curr]: currentValue && filterConfigs[curr].getValues(currentValue),
      }
    }, {} as FilterValues)
  }
  const search = useSearch({ from: searchPath })
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [filtersValues, setFiltersValues] = useState<FilterValues>(getFiltersValues(initialFilters))
  const [filterPreloaded, setFilterPreloaded] = useState(false)
  const [quantities, setQuantities] = useState(getQuantities(filtersValues))
  const navigate = useNavigate()

  useEffect(() => {
    if (dataIsLoading) return
    updateUrlFromFilters()
  }, [dataIsLoading, filterConfigs])

  useEffect(() => {
    setQuantities(getQuantities(filtersValues))
  }, [filtersValues])

  const updateUrlFromFilters = () => {
    const stringifySearch = Object.fromEntries(
      Object.entries(search).map(([key, value]) => [key, value ? String(value) : ''])
    )
    const incomingSearch = new URLSearchParams(stringifySearch)
    const newSearch: Partial<Record<Key, unknown>> = {}
    const newFilters = {} as Filters
    Object.keys(filterConfigs).forEach((k) => {
      const key = k as Key
      const urlIncomingValue = incomingSearch.get(key)
      if (!urlIncomingValue) return

      if (!('options' in filterConfigs[key])) {
        const optionFromValue = {
          label: urlIncomingValue,
          value: String(urlIncomingValue),
        } as Filters[Key]
        newFilters[key] = optionFromValue
        newSearch[key] = urlIncomingValue
        optionFromValue && filterConfigs[key].getValues(optionFromValue)
        return
      }

      const existingOption = filterConfigs[key].options?.find(
        (el) => el.value === urlIncomingValue
      ) as Filters[Key]
      if (!existingOption) return

      newFilters[key] = existingOption

      if (urlIncomingValue === filtersValues[key]) return (newSearch[key] = urlIncomingValue)

      newSearch[key] = filterConfigs[key].getValues(existingOption)
    })
    navigate({ search: searchSchema ? searchSchema.parse(newSearch) : newSearch })
    setFilters(newFilters)
    setFiltersValues(getFiltersValues(newFilters))
    setFilterPreloaded(true)
  }

  const onChange = (newFilters: Filters) => {
    const newFiltersValues = getFiltersValues(newFilters)
    const newSearch: Partial<Record<Key, unknown>> = {}
    Object.keys(newFiltersValues).forEach((key) => {
      const newValue = newFiltersValues[key as Key]
      if (!newValue) return

      newSearch[key as Key] = newValue
    })

    setFilters(newFilters)
    setFiltersValues(newFiltersValues)
    navigate({ search: searchSchema ? searchSchema.parse(newSearch) : newSearch })
  }

  const handleDeleteFilter = (filterName: Key) => {
    const newFilters = {
      ...filters,
      [filterName]: initialFilters[filterName],
    }

    onChange(newFilters)
  }

  const handleApplyFilter = (filterName: Key, value: Filters[Key]) => {
    onChange({ ...filters, [filterName]: value })
  }

  const handleResetFilters = () => {
    onChange(initialFilters)
  }

  return {
    filterConfigs,
    filterPreloaded,
    filters,
    onChange,
    filtersValues,
    initialFilters,
    handleDeleteFilter,
    handleApplyFilter,
    handleResetFilters,
    quantities,
  }
}
