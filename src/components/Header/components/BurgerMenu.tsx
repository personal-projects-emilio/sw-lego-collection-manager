import { FC, useState } from 'react'
import { MdMenu } from 'react-icons/md'
import { IconButton, IconButtonProps, Menu, MenuItem } from '@mui/material'
import { Link } from '@tanstack/router'

import { useCurrentRoute } from 'hooks'
import { useAuth } from 'providers'

export const BurgerMenu: FC = () => {
  const { idToken, logout } = useAuth()
  const currentRoute = useCurrentRoute(['/', '/auth'])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const handleLogout = () => {
    handleClose()
    logout()
  }

  return (
    <>
      <IconButton
        id="application-menu-icon"
        aria-label="application menu icon"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenu}
      >
        <MdMenu />
      </IconButton>
      <Menu
        id="menu-header"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={(theme) => ({
          '& .Mui-selected': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightBold,
          },
        })}
        MenuListProps={{
          'aria-labelledby': 'application-menu-icon',
        }}
      >
        <MenuItem
          component={(props) => <Link {...props} />}
          onClick={handleClose}
          selected={currentRoute?.id === '/'}
          to="/"
        >
          Minifigs
        </MenuItem>
        {idToken ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem
            component={(props) => <Link {...props} />}
            onClick={handleClose}
            selected={currentRoute?.id === '/auth'}
            to="/auth"
          >
            Login
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default BurgerMenu
