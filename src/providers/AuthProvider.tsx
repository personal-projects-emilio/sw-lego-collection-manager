import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { UseMutateFunction, useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/router'

import { loginUser, refreshSecureToken } from 'api/auth'
import { LoginData } from 'types/auth'
import { LoginInputs } from 'types/auth'

type Auth = {
  idToken?: LoginData['idToken']
  login: UseMutateFunction<LoginData, unknown, LoginInputs, unknown>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<Auth>({
  idToken: undefined,
  login: () => void 0,
  logout: () => void 0,
  isLoading: false,
})

const clearAuthLocalStorage = () => {
  localStorage.removeItem('idToken')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('refreshToken')
}

let expireAuthTiemout: ReturnType<typeof setTimeout>

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const [idToken, setIdToken] = useState<string>()
  const setAuthTimeout = (expirationDate: string) => {
    expireAuthTiemout = setTimeout(() => {
      mutateRefreshToken()
    }, new Date(expirationDate).getTime() - new Date().getTime())
  }
  useEffect(() => {
    const storageIdToken = localStorage.getItem('idToken')
    const storageExpirationDate = localStorage.getItem('expirationDate')

    if (!storageIdToken || !storageExpirationDate) return clearTimeout(expireAuthTiemout)
    if (new Date(storageExpirationDate) <= new Date()) return clearAuthLocalStorage()

    setIdToken(storageIdToken)
    setAuthTimeout(storageExpirationDate)
  }, [])

  const { mutate: login, isLoading: isLoginLoading } = useMutation(loginUser, {
    onSuccess: ({ expiresIn, idToken: newIdToken, refreshToken }) => {
      setIdToken(newIdToken)
      const expirationDate = new Date(
        new Date().getTime() + parseInt(expiresIn, 10) * 1000
      ).toISOString()

      localStorage.setItem('idToken', newIdToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('expirationDate', expirationDate)
      navigate({ to: '/' })
    },
    onError: () => {
      logout()
    },
  })

  const { mutate: mutateRefreshToken, isLoading: isRefreshLoading } = useMutation(
    refreshSecureToken,
    {
      onSuccess: ({ expires_in, id_token, refresh_token }) => {
        clearTimeout(expireAuthTiemout)
        setIdToken(id_token)
        const expirationDate = new Date(
          new Date().getTime() + parseInt(expires_in, 10) * 1000
        ).toISOString()

        localStorage.setItem('idToken', id_token)
        localStorage.setItem('refreshToken', refresh_token)
        localStorage.setItem('expirationDate', expirationDate)
        setAuthTimeout(expirationDate)
      },
      onError: () => {
        logout()
      },
    }
  )

  const logout = () => {
    clearAuthLocalStorage()
    setIdToken(undefined)
    navigate({ to: '/auth' })
    clearTimeout(expireAuthTiemout)
  }

  return (
    <AuthContext.Provider
      value={{
        idToken,
        login,
        logout,
        isLoading: isLoginLoading || isRefreshLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
