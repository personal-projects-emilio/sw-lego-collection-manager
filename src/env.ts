/// <reference types="vite/client" />
import z from 'zod'

const envVariable = z.object({
  BASE_URL: z.string(),
  DEV: z.boolean(),
  PROD: z.boolean(),
  SSR: z.boolean(),
  MODE: z.union([z.literal('development'), z.literal('production')]),
  VITE_API_BASE_URL: z.string().url(),
  VITE_APP_AUTH_BASE_URL: z.string().url(),
  VITE_APP_REFRESH_AUTH_BASE_URL: z.string().url(),
})

export const env = envVariable.parse(import.meta.env)

export type ImportMetaEnv = z.infer<typeof envVariable>
