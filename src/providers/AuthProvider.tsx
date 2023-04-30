import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { UseMutateFunction, useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/router'

import { loginUser } from 'api/auth'
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
}

let expireAuthTiemout: ReturnType<typeof setTimeout>

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const [idToken, setIdToken] = useState<string>()

  useEffect(() => {
    const storageIdToken = localStorage.getItem('idToken')
    const storageExpirationDate = localStorage.getItem('expirationDate')

    if (!storageIdToken || !storageExpirationDate) return clearTimeout(expireAuthTiemout)
    if (new Date(storageExpirationDate) <= new Date()) return clearAuthLocalStorage()

    setIdToken(storageIdToken)
    setAuthTimeout(storageExpirationDate)
  }, [])

  const setAuthTimeout = (expirationDate: string) => {
    expireAuthTiemout = setTimeout(() => {
      logout()
    }, new Date(expirationDate).getTime() - new Date().getTime())
  }

  const { mutate: login, isLoading } = useMutation(loginUser, {
    onSuccess: ({ expiresIn, idToken }) => {
      setIdToken(idToken)
      const expirationDate = new Date(
        new Date().getTime() + parseInt(expiresIn, 10) * 1000
      ).toISOString()

      localStorage.setItem('idToken', idToken)
      localStorage.setItem('expirationDate', expirationDate)
      navigate({ to: '/' })
    },
    onError: (error) => console.error(error),
  })

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
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
