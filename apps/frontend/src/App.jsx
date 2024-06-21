import { useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Appbar } from 'src/feature/ui'
import { getTheme } from 'src/lib/theme'
import './App.css'

const App = () => {
  const theme = useMemo(() => createTheme(getTheme()), [])
  return (
    <ThemeProvider theme={theme}>
      <Appbar />
    </ThemeProvider>
  )
}

export default App
