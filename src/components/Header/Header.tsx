import { FC } from 'react'
import { AppBar, Hidden, Toolbar, Typography } from '@mui/material'

import BurgerMenu from './components/BurgerMenu'
import TabMenu from './components/TabMenu'

import appLogo from 'assets/favicon.ico'

export const Header: FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <img src={appLogo} style={{ height: 24 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 1 }}>
          SW Lego
          <Hidden smDown> Collection Manager</Hidden>
        </Typography>
        <Hidden mdUp>
          <BurgerMenu />
        </Hidden>
        <Hidden mdDown>
          <TabMenu />
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default Header
