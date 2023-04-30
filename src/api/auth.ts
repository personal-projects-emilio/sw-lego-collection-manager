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
