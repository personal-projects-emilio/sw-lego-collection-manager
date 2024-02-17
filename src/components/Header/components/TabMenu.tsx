import { FC, forwardRef } from 'react'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Link, LinkPropsOptions } from '@tanstack/router'

import { useCurrentRoute } from 'hooks'
import { useAuth } from 'providers'

const a11yTabProps = (name: string, index: number) => ({
  id: `tab-${name}-nav-${index}`,
  'aria-controls': `tab-${name}-nav-${index}`,
})

const RefLink = forwardRef<HTMLAnchorElement, LinkPropsOptions>((props, ref) => (
  <Link ref={ref} {...props} />
))
RefLink.displayName = 'RefLink'

export const TabMenu: FC = () => {
  const { idToken, logout } = useAuth()
  const currentRoute = useCurrentRoute(['/', '/sets', '/auth'])

  return (
    <Tabs value={currentRoute?.id ?? '/'} aria-label="Tab Navigation menu">
      <Tab component={RefLink} label="Minifigs" to="/" value="/" {...a11yTabProps('app', 0)} />
      <Tab component={RefLink} label="Sets" to="/sets" value="/sets" {...a11yTabProps('app', 1)} />
      {idToken ? (
        <Tab label="Logout" onClick={logout} {...a11yTabProps('app', 2)} />
      ) : (
        <Tab
          component={RefLink}
          label="Login"
          to="/auth"
          value="/auth"
          {...a11yTabProps('app', 2)}
        />
      )}
    </Tabs>
  )
}

export default TabMenu
