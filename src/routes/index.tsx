import {VFC} from 'react'
import {Routes, Route} from 'react-router-dom'

import RouteMap from '../constants/routes'
import {Main, Table, Chart, Export} from '../screens'

const {ROUTE_MAIN, ROUTE_TABLE, ROUTE_CHART, ROUTE_EXPORT} = RouteMap

const Root: VFC = () => {
  return (
    <Routes>
      <Route path={ROUTE_MAIN} element={<Main />} />
      <Route path={ROUTE_TABLE} element={<Table />} />
      <Route path={ROUTE_CHART} element={<Chart />} />
      <Route path={ROUTE_EXPORT} element={<Export />} />
      <Route path="*" element={<Main />} />
    </Routes>
  )
}

export default Root
