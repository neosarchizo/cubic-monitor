import {FC, useCallback, ChangeEvent, useMemo} from 'react'
import {InputLabel, MenuItem} from '@material-ui/core'

import {useI18n} from '../../utils/i18n'
import {Props, RefreshIntervalOption} from './types'
import {MySelect} from './styles'
import {RefreshIntervalType} from '../../types'

const Main: FC<Props> = (props) => {
  const {t} = useI18n()

  const {value, onChange, ref} = props

  const options = useMemo<RefreshIntervalOption[]>(() => {
    return [
      {id: '1_SEC', name: `1${t('second')}`},
      {id: '6_SECS', name: `6${t('seconds')}`},
      {id: '1_MIN', name: `1${t('minute')}`},
    ]
  }, [t])

  const handleOnSelectChange = useCallback<
    (
      event: ChangeEvent<{
        name?: string | undefined
        value: unknown
      }>,
    ) => void
  >(
    (event) => {
      const {
        target: {value: v},
      } = event

      onChange(v as RefreshIntervalType)
    },
    [onChange],
  )

  return (
    <>
      <InputLabel id="lblRefreshInterval">{t('refreshInterval')}</InputLabel>
      <MySelect
        labelId="lblRefreshInterval"
        id="refreshInterval"
        value={value}
        name="refreshInterval"
        inputRef={ref}
        onChange={handleOnSelectChange}>
        {options.map((o) => {
          const {id: oId, name} = o
          return (
            <MenuItem key={oId} value={oId}>
              {name}
            </MenuItem>
          )
        })}
      </MySelect>
    </>
  )
}

export default Main
