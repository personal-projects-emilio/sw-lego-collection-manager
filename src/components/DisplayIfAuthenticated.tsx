import { FC, PropsWithChildren } from 'react'

import { useAuth } from 'providers'

export const DisplayIfAuthenticated: FC<PropsWithChildren> = ({ children }) => {
  const { idToken } = useAuth()

  if (!idToken) return null

  return <>{children}</>
}

export default DisplayIfAuthenticated
