import { useEffect, useState } from 'react'

import { FilterConfig, FiltersController } from 'types/filters'

interface UseFiltersProps<
  K extends string = string,
  C extends Record<K, FilterConfig> = Record<K, FilterConfig>,
  F extends Record<K, C[K]['defaultValue']> = Record<K, C[K]['defaultValue']>
> {
  filterConfigs: C
  initialFilters: F
  dataIsLoading?: boolean
}

export const useFilters = <
  K extends string = string,
  C extends Record<K, FilterConfig> = Record<K, FilterConfig>,
  F extends Record<K, C[K]['defaultValue']> = Record<K, C[K]['defaultValue']>,
  FV extends Partial<Record<K, ReturnType<C[K]['getValues']>>> = Partial<
    Record<K, ReturnType<C[K]['getValues']>>
  >
>({
  filterConfigs,
  initialFilters,
  dataIsLoading = false,
}: UseFiltersProps<K, C, F>): FiltersController<K, C, F, FV> => {
  const getFiltersValues = (filters: F) => {
    return (Object.keys(filters) as K[]).reduce((acc, curr) => {
      const currentValue = filters[curr]
      return {
        ...acc,
        [curr]: currentValue && filterConfigs[curr].getValues(currentValue),
      }
    }, {} as FV)
  }

  const [filters, setFilters] = useState<F>(initialFilters)
  const [filtersValues, setFiltersValues] = useState<FV>(getFiltersValues(initialFilters))
  const [filterPreloaded, setFilterPreloaded] = useState(false)

  useEffect(() => {
    if (dataIsLoading) return
    updateUrlFromFilters()
  }, [dataIsLoading])

  const updateUrlFromFilters = () => {
    const incomingSearch = new URLSearchParams(window.location.search)
    const newSearch = new URLSearchParams()
    const newFilters = { ...filters }
    Object.keys(filtersValues).forEach((k) => {
      const key = k as K
      const urlIncomingValue = incomingSearch.get(key)
      if (urlIncomingValue && urlIncomingValue !== filtersValues[key]) {
        newFilters[key] = filterConfigs[key].options?.find(
          (el) => el.value === urlIncomingValue
        ) as F[K]
      }
      const optionValue = newFilters[key]

      if (!optionValue) return

      newSearch.set(key, filterConfigs[key].getValues(optionValue))
    })
    window.history.pushState('', '', `?${newSearch.toString()}`)
    setFilters(newFilters)
    setFiltersValues(getFiltersValues(newFilters))
    setFilterPreloaded(true)
  }

  const onChange = (newFilters: F) => {
    const newFiltersValues = getFiltersValues(newFilters)
    const newSearch = new URLSearchParams()
    Object.keys(filtersValues).forEach((key) => {
      const newValue = newFiltersValues[key as K]
      if (!newValue) return

      newSearch.set(key, newValue)
    })
    setFilters(newFilters)
    setFiltersValues(newFiltersValues)
    window.history.pushState('', '', `?${newSearch.toString()}`)
  }

  const handleDeleteFilter = (filterName: K) => {
    const newFilters = {
      ...filters,
      [filterName]: initialFilters[filterName],
    }

    onChange(newFilters)
  }

  const handleApplyFilter = (filterName: K, value: F[K]) => {
    onChange({ ...filters, [filterName]: value })
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
  }
}
