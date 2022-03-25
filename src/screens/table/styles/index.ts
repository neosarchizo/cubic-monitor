import styled from 'styled-components'
import {DataGrid} from '@mui/x-data-grid'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Body = styled.div`
  flex: 1;
  padding: 5px;
`

export const MyDataGrid = styled(DataGrid).attrs({
  components: {
    NoRowsOverlay: () => {
      return null
    },
  },
  checkboxSelection: false,
})``
