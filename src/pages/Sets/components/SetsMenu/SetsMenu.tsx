import { FC } from 'react'
import { AppBar, Toolbar } from '@mui/material'

import DisplayIfAuthenticated from 'components/DisplayIfAuthenticated'
import Filters from 'components/Filters/Filters'
import useSetsFilters from 'pages/Sets/hooks/useSetsFilters'
import { useAuth } from 'providers'

import AddSetButton from './components/AddSetButton'
import SetPricesStatistics from './components/SetPricesStatistics'
import SyncMinifigsButton from './components/SyncMinifigsButton'

import useStyles from './styles'

export const SetsMenu: FC = () => {
  const filtersController = useSetsFilters()
  const { idToken } = useAuth()
  const { classes, cx } = useStyles()
  return (
    <>
      <AppBar position="sticky" sx={{ top: 48, zIndex: 100 }}>
        <Toolbar
          variant="dense"
          className={cx(classes.toolbar, { [classes.isAuthenticated]: !!idToken })}
        >
          <Filters {...filtersController} />
          <DisplayIfAuthenticated>
            <SetPricesStatistics />
          </DisplayIfAuthenticated>
          <SyncMinifigsButton />
          <AddSetButton />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default SetsMenu
