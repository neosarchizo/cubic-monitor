import {VFC} from 'react'
import {Routes, Route} from 'react-router-dom'

import RouteMap from '../constants/routes'
import Main from '../screens/main'

const {ROUTE_MAIN} = RouteMap

const Root: VFC = () => {
  return (
    <Routes>
      <Route path={ROUTE_MAIN} element={<Main />} />
      <Route path="*" element={<Main />} />
    </Routes>
  )
}

export default Root
