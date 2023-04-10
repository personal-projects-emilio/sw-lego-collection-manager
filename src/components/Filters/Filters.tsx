import { MouseEvent, useCallback, useMemo, useState } from 'react'
import { Box, Button } from '@mui/material'

import { FilterConfig, FiltersController } from 'types/filters'
import { getEntries } from 'utils/array'

import { FilterChip, FilterChipProps, FilterPopover } from './components'

export function Filters<
  K extends string = string,
  C extends Record<K, FilterConfig> = Record<K, FilterConfig>,
  F extends Record<K, C[K]['defaultValue']> = Record<K, C[K]['defaultValue']>
>({ filterConfigs, filters, handleApplyFilter, handleDeleteFilter }: FiltersController<K, C, F>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<
    null | (C[K] & { value: F[K]; filterName: K })
  >(null)

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null)
    setSelectedFilter(null)
  }, [])

  const handleEditFilter = (event: MouseEvent<HTMLDivElement>, filterName: K) => {
    const selectedFilter = filterConfigs[filterName]
    setSelectedFilter({ ...selectedFilter, value: filters[filterName], filterName })
    setAnchorEl(event.currentTarget)
  }

  const handleAddFilter = (filterName: K) =>
    setSelectedFilter({ ...filterConfigs[filterName], value: filters[filterName], filterName })

  const handleShowPopover = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
    setSelectedFilter(null)
  }, [])

  const chips: Pick<FilterChipProps<K>, 'label' | 'filterName' | 'isDeletable'>[] = useMemo(() => {
    if (!Object.keys(filters).length) return []

    return getEntries(filterConfigs).reduce((acc, curr) => {
      const [filterName, config] = curr as [K, C[K]]
      const configValue = filters[filterName]
      if (!configValue) return acc
      if (!config.displayChip(configValue)) return acc
      return [
        ...acc,
        {
          filterName,
          label: `${config.label}: ${config.chipLabel(configValue)}`,
          isDeletable: !config.isMandatory,
        },
      ]
    }, [] as Pick<FilterChipProps<K>, 'label' | 'filterName' | 'isDeletable'>[])
  }, [filterConfigs, filters])

  const availableFilterConfigs = useMemo(
    () =>
      getEntries(filterConfigs)
        .reduce((acc, curr) => {
          const [filterName, config] = curr as [K, C[K]]
          if (chips.find((el) => el.filterName === filterName)) return acc
          return [
            ...acc,
            {
              ...config,
              filterName,
            },
          ]
        }, [] as Array<C[K] & { filterName: K }>)
        .sort((a, b) => a.label.localeCompare(b.label)),
    [chips, filterConfigs]
  )

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        gap: theme.spacing(1),
        alignItems: 'center',
      })}
    >
      {chips.map((chipsProps) => (
        <FilterChip
          key={`chip-filter-${chipsProps.filterName}`}
          {...chipsProps}
          handleDeleteFilter={handleDeleteFilter}
          handleEditFilter={handleEditFilter}
        />
      ))}
      <FilterPopover
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        availableFilterConfigs={availableFilterConfigs}
        selectedFilter={selectedFilter}
        handleApplyFilter={handleApplyFilter}
        handleAddFilter={handleAddFilter}
      />
      {Boolean(availableFilterConfigs.length) && (
        <Button onClick={handleShowPopover}>Add a filter</Button>
      )}
    </Box>
  )
}

export default Filters
