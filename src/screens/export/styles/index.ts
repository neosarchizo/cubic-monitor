import styled from 'styled-components'
import {Grid, Typography} from '@material-ui/core'
import {KeyboardDateTimePicker} from '@material-ui/pickers'
import {FORMAT_DATETIME} from '../constants'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Body = styled(Grid).attrs({container: true, spacing: 3})`
  flex: 1;
  width: 100%;
  padding: 5px;
`

export const Item = styled(Grid).attrs({item: true, xs: 12, sm: 6, md: 3})``

export const DateTimePicker = styled(KeyboardDateTimePicker).attrs({
  variant: 'inline',
  ampm: false,
  format: FORMAT_DATETIME,
  fullWidth: true,
})``

export const TextContainer = styled(Grid).attrs({item: true, xs: 12})``

export const Text = styled(Typography).attrs({variant: 'body1'})``