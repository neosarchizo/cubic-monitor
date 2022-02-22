import {FC, useCallback, ChangeEvent, useMemo} from 'react'
import {InputLabel, MenuItem} from '@material-ui/core'

import {useI18n} from '../../utils/i18n'
import {Props} from './types'
import {ModelOption} from '../../types'
import {MySelect} from './styles'

const Main: FC<Props> = (props) => {
  const {t} = useI18n()

  const {value, onChange, ref} = props

  const options = useMemo<ModelOption[]>(() => {
    return [
      {id: 'PM2008', name: t('pm2008')},
      {id: 'CM1106', name: t('cm1106')},
      {id: 'CM1107', name: t('cm1107')},
      {id: 'AM1008WK', name: t('am1008wk')},
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

      onChange(v as string)
    },
    [onChange],
  )

  return (
    <>
      <InputLabel id="lblModel">{t('model')}</InputLabel>
      <MySelect
        labelId="lblModel"
        id="model"
        value={value}
        name="model"
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
