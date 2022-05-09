import {FC, useCallback} from 'react'
import {DialogActions, DialogContent} from '@mui/material'

import {Props} from './types'
import {Container, Title, Description, BtnOk} from './styles'
import {useI18n} from '../../../../utils/i18n'

const Main: FC<Props> = (props) => {
  const {t} = useI18n()

  const {open, onClose, filePath} = props

  const handleOnOkClick = useCallback<() => void>(() => {
    onClose()
  }, [onClose])

  return (
    <Container open={open} onClose={onClose}>
      <Title>{t('exportingResult')}</Title>
      <DialogContent>
        <Description>{`${t('filePath')} : ${filePath}`}</Description>
      </DialogContent>
      <DialogActions>
        <BtnOk onClick={handleOnOkClick}>{t('ok')}</BtnOk>
      </DialogActions>
    </Container>
  )
}

export default Main
