import {VoidFunctionComponent} from 'react'
import {CssBaseline} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import {ThemeProvider} from 'styled-components'
import {BrowserRouter as Router} from 'react-router-dom'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'

import Root from './routes'
import * as I18n from './utils/i18n'
import {DeviceProvider} from './contexts/device'

I18n.init()

const App: VoidFunctionComponent = () => {
  const theme = useTheme()

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider locale="ko" libInstance={moment} utils={MomentUtils}>
          <DeviceProvider>
            <Router>
              <Root />
            </Router>
          </DeviceProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </>
  )
}

export default App
