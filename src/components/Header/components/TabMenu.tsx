import { FC } from 'react'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Link } from '@tanstack/router'

import { useCurrentRoute } from 'hooks'
import { useAuth } from 'providers'

const a11yTabProps = (name: string, index: number) => ({
  id: `tab-${name}-nav-${index}`,
  'aria-controls': `tab-${name}-nav-${index}`,
})

export const TabMenu: FC = () => {
  const { idToken, logout } = useAuth()
  const currentRoute = useCurrentRoute(['/', '/auth'])

  return (
    <Tabs value={currentRoute?.id ?? '/'} aria-label="Tab Navigation menu">
      <Tab
        component={(props) => <Link {...props} />}
        label="Minifigs"
        to="/"
        value="/"
        {...a11yTabProps('app', 0)}
      />
      {idToken ? (
        <Tab label="Logout" onClick={logout} {...a11yTabProps('app', 1)} />
      ) : (
        <Tab
          component={(props) => <Link {...props} />}
          label="Login"
          to="/auth"
          value="/auth"
          {...a11yTabProps('app', 1)}
        />
      )}
    </Tabs>
  )
}

export default TabMenu
