import styled from 'styled-components'
import {Dialog, DialogTitle, DialogContentText, Button} from '@mui/material'

export const Container = styled(Dialog).attrs({
  'aria-labelledby': 'dlg-result-title',
  'aria-describedby': 'dlg-result-description',
})``

export const Title = styled(DialogTitle).attrs({id: 'dlg-result-title'})``

export const Description = styled(DialogContentText).attrs({id: 'dlg-result-description'})``

export const BtnOk = styled(Button).attrs({autoFocus: true})``
