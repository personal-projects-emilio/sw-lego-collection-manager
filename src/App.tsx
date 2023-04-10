import { AppBar, Hidden, Toolbar, Typography } from '@mui/material'

import Minifigs from 'pages/Minifigs'
import { QueryClientProvider, ThemeProvider } from 'providers'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import appLogo from 'assets/favicon.ico'

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <img src={appLogo} style={{ height: 24 }} />
            <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 1 }}>
              SW Lego
              <Hidden smDown> Collection Manager</Hidden>
            </Typography>
          </Toolbar>
        </AppBar>
        <Minifigs />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
