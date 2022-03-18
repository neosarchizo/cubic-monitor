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
      {id: '5_SECS', name: `5${t('seconds')}`},
      {id: '10_SECS', name: `10${t('seconds')}`},
      {id: '30_SECS', name: `30${t('seconds')}`},
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
