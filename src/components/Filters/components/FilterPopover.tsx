import { useEffect, useState } from 'react'
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Popover } from '@mui/material'

import { FilterConfig } from 'types/filters'

type FilterPopoverProps<
  K extends string = string,
  C extends Record<K, FilterConfig> = Record<K, FilterConfig>,
  F extends Record<K, C[K]['defaultValue']> = Record<K, C[K]['defaultValue']>
> = {
  anchorEl: HTMLElement | null
  onClose: () => void
  selectedFilter: null | (C[K] & { value: F[K]; filterName: K })
  availableFilterConfigs: Array<C[K] & { filterName: K }>
  handleApplyFilter: (filterName: K, value: F[K]) => void
  handleAddFilter: (filterName: K) => void
}

export function FilterPopover<
  K extends string = string,
  C extends Record<K, FilterConfig> = Record<K, FilterConfig>,
  F extends Record<K, C[K]['defaultValue']> = Record<K, C[K]['defaultValue']>
>({
  anchorEl,
  onClose,
  selectedFilter,
  availableFilterConfigs,
  handleApplyFilter,
  handleAddFilter,
}: FilterPopoverProps<K, C, F>) {
  const [value, setValue] = useState(selectedFilter?.value)

  useEffect(() => {
    if (!selectedFilter) return
    setValue(selectedFilter.value ?? (selectedFilter.defaultValue as F[K]))
  }, [selectedFilter])

  const handleApply = () => {
    if (!selectedFilter || !value) return
    handleApplyFilter(selectedFilter.filterName, value)
    onClose()
  }

  // If no selected filter and no available config we have nothing to render
  if (!selectedFilter && !availableFilterConfigs.length) return null

  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      {selectedFilter ? (
        <Box
          component="form"
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            margin: theme.spacing(2),
            gap: theme.spacing(1),
            '& :first-child': {
              gridColumn: 'span 2',
            },
          })}
        >
          <selectedFilter.component
            option={value}
            onChange={(option) => setValue(option as F[K])}
          />
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" onClick={handleApply} variant="contained">
            Apply
          </Button>
        </Box>
      ) : (
        <List>
          {availableFilterConfigs.map((filter) => (
            <ListItem key={`filter-list-item-${filter.filterName}`}>
              <ListItemButton onClick={() => handleAddFilter(filter.filterName)}>
                <ListItemText primary={filter.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Popover>
  )
}
