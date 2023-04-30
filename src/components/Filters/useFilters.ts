import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/router'
import { ZodObject, ZodRawShape } from 'zod'

import { FilterConfig, FiltersController } from 'types/filters'

interface UseFiltersProps<
  Key extends string = string,
  Configs extends Record<Key, FilterConfig> = Record<Key, FilterConfig>,
  Filters extends Record<Key, Configs[Key]['defaultValue']> = Record<
    Key,
    Configs[Key]['defaultValue']
  >,
  SearchSchema extends ZodRawShape = ZodRawShape
> {
  filterConfigs: Configs
  initialFilters: Filters
  dataIsLoading?: boolean
  searchSchema?: ZodObject<SearchSchema>
  getQuantities: (filterValues: Partial<Record<Key, ReturnType<Configs[Key]['getValues']>>>) => {
    total: number
    filteredTotal: number
  }
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
  >
>({
  filterConfigs,
  initialFilters,
  dataIsLoading = false,
  searchSchema,
  getQuantities,
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

  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [filtersValues, setFiltersValues] = useState<FilterValues>(getFiltersValues(initialFilters))
  const [filterPreloaded, setFilterPreloaded] = useState(false)
  const [quantities, setQuantities] = useState(getQuantities(filtersValues))
  const navigate = useNavigate()

  useEffect(() => {
    if (dataIsLoading) return
    updateUrlFromFilters()
  }, [dataIsLoading])

  useEffect(() => {
    setQuantities(getQuantities(filtersValues))
  }, [filtersValues])

  const updateUrlFromFilters = () => {
    const incomingSearch = new URLSearchParams(window.location.search)
    const newSearch: Partial<Record<Key, unknown>> = {}
    const newFilters = { ...filters }
    Object.keys(filtersValues).forEach((k) => {
      const key = k as Key
      const urlIncomingValue = incomingSearch.get(key)
      if (!urlIncomingValue) return

      if (urlIncomingValue === filtersValues[key]) return (newSearch[key] = urlIncomingValue)

      newFilters[key] = filterConfigs[key].options?.find(
        (el) => el.value === urlIncomingValue
      ) as Filters[Key]
      const optionValue = newFilters[key]

      if (!optionValue) return

      newSearch[key] = filterConfigs[key].getValues(optionValue)
    })
    navigate({ search: searchSchema ? searchSchema.parse(newSearch) : newSearch })
    setFilters(newFilters)
    setFiltersValues(getFiltersValues(newFilters))
    setFilterPreloaded(true)
  }

  const onChange = (newFilters: Filters) => {
    const newFiltersValues = getFiltersValues(newFilters)
    const newSearch: Partial<Record<Key, unknown>> = {}
    Object.keys(filtersValues).forEach((key) => {
      const newValue = newFiltersValues[key as Key]
      if (!newValue) return

      newSearch[key as Key] = newValue
    })
    setFilters(newFilters)
    setFiltersValues(newFiltersValues)
    navigate({ search: newSearch })
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
