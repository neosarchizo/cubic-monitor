import styled from 'styled-components'
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 64px;
`

export const MyAppBar = styled(AppBar)``

export const MyToolbar = styled(Toolbar)``

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

export const MyIconButton = styled(IconButton)`
  color: white;
`

export const Title = styled(Typography).attrs({variant: 'h6'})`
  flex-grow: 1;
`
