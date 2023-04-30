import { z } from 'zod'

export const authValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email' })
    .max(255, { message: 'Less than 255 characters required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(255, { message: 'Less than 255 characters required' }),
})

export type LoginInputs = z.infer<typeof authValidationSchema>

export type LoginData = {
  idToken: string
  displayName: string
  kind: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: boolean
}
