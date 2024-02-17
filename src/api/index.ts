import axios from 'axios'
import { env } from 'env'

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
})

// We add the auth token for mutation queries
api.interceptors.request.use((config) => {
  const idToken = localStorage.getItem('idToken')
  if (config.method?.toLowerCase() !== 'get' && idToken) {
    config.params = {
      auth: idToken,
    }
  }
  return config
})

export default api
