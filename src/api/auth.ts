import axios from 'axios'
import { env } from 'env'

import { LoginData, LoginInputs } from 'types/auth'

export const loginUser = async (loginInputs: LoginInputs) => {
  const response = await axios.post<LoginData>(env.VITE_APP_AUTH_BASE_URL, {
    ...loginInputs,
    returnSecureToken: true,
  })
  return response.data
}

export const refreshSecureToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) return
  const response = await axios.post(env.VITE_APP_REFRESH_AUTH_BASE_URL, {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  })
  return response.data
}
