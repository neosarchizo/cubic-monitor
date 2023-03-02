import styled from 'styled-components'
import Plot from 'react-plotly.js'
import {Grid} from '@material-ui/core'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Body = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const MyPlot = styled(Plot).attrs({
  layout: {
    showlegend: false,
    autosize: true,
    yaxis: {fixedrange: true},
  },
  useResizeHandler: true,
})`
  width: 100%;
  height: 100%;
`

export const LegendPanel = styled(Grid).attrs({container: true, spacing: 3})`
  width: 100%;
  padding: 10px;
`

export const Item = styled(Grid).attrs({item: true, xs: 12, sm: 6, md: 3})``
