import { FC } from 'react'
import { AppBar, Toolbar } from '@mui/material'

import Filters from 'components/Filters/Filters'
import useMinifigsFilters from 'pages/Minifigs/hooks/useMinifigsFilters'

export const MinifigsMenu: FC = () => {
  const filtersController = useMinifigsFilters()
  return (
    <AppBar position="sticky" sx={{ top: 48, zIndex: 100 }}>
      <Toolbar variant="dense">
        <Filters {...filtersController} />
      </Toolbar>
    </AppBar>
  )
}

export default MinifigsMenu
