import React from 'react'
import ReactDOM from 'react-dom'

import GlobalStyles from './global-styles'
import App from './app'
import reportWebVitals from './report-web-vitals'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
