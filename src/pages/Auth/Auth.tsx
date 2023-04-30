import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material'

import { useToggle } from 'hooks'
import { useAuth } from 'providers'
import { authValidationSchema, LoginInputs } from 'types/auth'

export const Auth: FC = () => {
  const [showPassword, toggleShowPassword] = useToggle()
  const { login, isLoading } = useAuth()
  const { control, handleSubmit } = useForm<LoginInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(authValidationSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => login(data)

  return (
    <Paper
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={(theme) => ({
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        boxSizing: 'border-box',
        display: 'grid',
        gap: theme.spacing(2),
      })}
    >
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <TextField
              {...field}
              label="Email"
              id="email"
              placeholder="Email@exemple.com"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              required
              fullWidth
            />
          )
        }}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => {
          return (
            <TextField
              {...field}
              label="Password"
              id="password"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              required
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => toggleShowPassword()}
                    >
                      {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )
        }}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isLoading}
        sx={{ justifySelf: 'center' }}
      >
        Login
      </Button>
    </Paper>
  )
}

export default Auth
