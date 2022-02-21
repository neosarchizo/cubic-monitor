import {VoidFunctionComponent} from 'react'
import {CssBaseline} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import {ThemeProvider} from 'styled-components'
import {BrowserRouter as Router} from 'react-router-dom'

import Root from './routes'
import * as I18n from './utils/i18n'
import {DeviceProvider} from './contexts/device'
import {DbProvider} from './contexts/db'

I18n.init()

const App: VoidFunctionComponent = () => {
  const theme = useTheme()

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <DbProvider>
          <DeviceProvider>
            <Router>
              <Root />
            </Router>
          </DeviceProvider>
        </DbProvider>
      </ThemeProvider>
    </>
  )
}

export default App
