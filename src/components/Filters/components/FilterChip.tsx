import { MouseEvent } from 'react'
import { Chip } from '@mui/material'

export interface FilterChipProps<K extends string> {
  label: string
  filterName: K
  isDeletable?: boolean
  handleEditFilter: (e: MouseEvent<HTMLDivElement>, filterName: K) => void
  handleDeleteFilter: (filterName: K) => void
}

export function FilterChip<K extends string>({
  label,
  filterName,
  isDeletable,
  handleEditFilter,
  handleDeleteFilter,
}: FilterChipProps<K>) {
  return (
    <Chip
      variant="outlined"
      label={label}
      onClick={(e) => {
        handleEditFilter(e, filterName)
      }}
      onDelete={
        isDeletable
          ? () => {
              handleDeleteFilter(filterName)
            }
          : undefined
      }
    />
  )
}

export default FilterChip
