import {FC, useCallback, ChangeEvent, useState} from 'react'
import {InputLabel, MenuItem} from '@material-ui/core'

import {useI18n} from '../../utils/i18n'
import {Props} from './types'
import {ModelOption} from '../../types'
import {MySelect} from './styles'

const Main: FC<Props> = (props) => {
  const {t} = useI18n()

  const {value, onChange, ref} = props

  const [options] = useState<ModelOption[]>([{id: 'NONE', name: t('none')}])

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
      <InputLabel id="lblSerialNumber">{t('serialNumber')}</InputLabel>
      <MySelect
        labelId="lblSerialNumber"
        id="serialNumber"
        value={value}
        name="serialNumber"
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
