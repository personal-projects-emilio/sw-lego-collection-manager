import { MouseEvent, useCallback, useMemo, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'

import { FilterConfig, FiltersController } from 'types/filters'
import { getEntries } from 'utils/array'

import { FilterChip, FilterChipProps, FilterPopover } from './components'

export function Filters<
  Key extends string = string,
  Configs extends Record<Key, FilterConfig> = Record<Key, FilterConfig>,
  Filters extends Record<Key, Configs[Key]['defaultValue']> = Record<
    Key,
    Configs[Key]['defaultValue']
  >,
>({
  filterConfigs,
  filters,
  handleApplyFilter,
  handleDeleteFilter,
  quantities: { total, filteredTotal },
}: FiltersController<Key, Configs, Filters>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<
    null | (Configs[Key] & { value: Filters[Key]; filterName: Key })
  >(null)

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null)
    setSelectedFilter(null)
  }, [])

  const handleEditFilter = (event: MouseEvent<HTMLDivElement>, filterName: Key) => {
    const selectedFilter = filterConfigs[filterName]
    setSelectedFilter({ ...selectedFilter, value: filters[filterName], filterName })
    setAnchorEl(event.currentTarget)
  }

  const handleAddFilter = (filterName: Key) =>
    setSelectedFilter({ ...filterConfigs[filterName], value: filters[filterName], filterName })

  const handleShowPopover = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
    setSelectedFilter(null)
  }, [])

  const chips: Pick<FilterChipProps<Key>, 'label' | 'filterName' | 'isDeletable'>[] =
    useMemo(() => {
      if (!Object.keys(filters).length) return []

      return getEntries(filterConfigs).reduce(
        (acc, curr) => {
          const [filterName, config] = curr as [Key, Configs[Key]]
          const configValue = filters[filterName]
          if (!configValue || !config.displayChip(configValue)) return acc
          return [
            ...acc,
            {
              filterName,
              label: `${config.label}: ${config.chipLabel(configValue)}`,
              isDeletable: !config.isMandatory,
            },
          ]
        },
        [] as Pick<FilterChipProps<Key>, 'label' | 'filterName' | 'isDeletable'>[]
      )
    }, [filterConfigs, filters])

  const availableFilterConfigs = useMemo(
    () =>
      getEntries(filterConfigs)
        .reduce(
          (acc, curr) => {
            const [filterName, config] = curr as [Key, Configs[Key]]
            if (chips.find((el) => el.filterName === filterName)) return acc
            return [
              ...acc,
              {
                ...config,
                filterName,
              },
            ]
          },
          [] as Array<Configs[Key] & { filterName: Key }>
        )
        .sort((a, b) => a.label.localeCompare(b.label)),
    [chips, filterConfigs]
  )
  return (
    <>
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
        {Boolean(availableFilterConfigs.length) && (
          <Button onClick={handleShowPopover}>Add a filter</Button>
        )}
        <Typography variant="caption">{`${filteredTotal} of ${total}`}</Typography>
      </Box>
      <FilterPopover
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        availableFilterConfigs={availableFilterConfigs}
        selectedFilter={selectedFilter}
        handleApplyFilter={handleApplyFilter}
        handleAddFilter={handleAddFilter}
      />
    </>
  )
}

export default Filters
