import { FC, PropsWithChildren } from 'react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

export const theme = createTheme({
  spacing: (factor: number) => `${factor * 0.5}em`,
  palette: {
    mode: 'dark',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
})

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
})

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <CacheProvider value={muiCache}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  </CacheProvider>
)

export default ThemeProvider
