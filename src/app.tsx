import {VFC} from 'react'
import {CssBaseline} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import {ThemeProvider} from 'styled-components'
import {BrowserRouter as Router} from 'react-router-dom'

import Root from './routes'
import {DeviceProvider} from './contexts/device'

const Main: VFC = () => {
  const theme = useTheme()

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <DeviceProvider>
          <Router>
            <Root />
          </Router>
        </DeviceProvider>
      </ThemeProvider>
    </>
  )
}

export default Main
