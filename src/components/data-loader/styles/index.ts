import styled from 'styled-components'
import {Grid} from '@material-ui/core'

export const Container = styled(Grid).attrs({container: true, spacing: 3})`
  width: 100%;
  padding: 10px;
`

export const Item = styled(Grid).attrs({item: true, xs: 12, sm: 6, md: 3})``

export const Dummy = {}
