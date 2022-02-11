import styled from 'styled-components'
import {DataGrid} from '@mui/x-data-grid'
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

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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

export const MyDataGrid = styled(DataGrid).attrs({
  components: {
    NoRowsOverlay: () => {
      return null
    },
  },
  checkboxSelection: false,
})``

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
