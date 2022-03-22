import styled from 'styled-components'
import {Grid} from '@material-ui/core'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const GridContainer = styled(Grid).attrs({container: true, spacing: 3})`
  width: 100%;
  padding: 10px;
`

export const TableContainer = styled.div`
  height: 400px;
  width: 100%;
`

export const Body = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: green;
`

export const DataGridContainer = styled.div`
  flex: 1;
  padding: 5px;
`

export const RowButton = styled.div`
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
