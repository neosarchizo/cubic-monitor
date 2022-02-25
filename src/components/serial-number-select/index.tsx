import {FC, useCallback, ChangeEvent, useEffect, useState} from 'react'
import {InputLabel, MenuItem} from '@material-ui/core'

import {useI18n} from '../../utils/i18n'
import {Props} from './types'
import {ModelOption} from '../../types'
import {MySelect} from './styles'
import {useDb} from '../../contexts/db'
import {EventListener} from '../../contexts/db/types'

const Main: FC<Props> = (props) => {
  const {t} = useI18n()
  const [dbManager] = useDb()

  const {value, onChange, ref, model} = props

  const [options, setOptions] = useState<ModelOption[]>([{id: 'NONE', name: t('none')}])

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

  const handleOnDbEvent = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      switch (type) {
        case 'IS_TABLE_EXISTED': {
          const param = payload as {name: string; existed: boolean}

          const {name, existed} = param

          if (name !== model) {
            return
          }

          if (!existed) {
            setOptions([{id: 'NONE', name: t('none')}])
            onChange('NONE')
            return
          }

          dbManager.getSerialNumbers(model)
          break
        }
        case 'GET_SERIAL_NUMBERS': {
          const param = payload as {name: string; serialNumbers: string[]}

          const {name, serialNumbers} = param

          if (name !== model) {
            return
          }

          if (serialNumbers.length === 0) {
            setOptions([{id: 'NONE', name: t('none')}])
            onChange('NONE')
            return
          }

          setOptions(
            serialNumbers.map((sn) => {
              return {id: sn, name: sn}
            }),
          )
          onChange(serialNumbers[0])

          break
        }

        default:
          break
      }
    },
    [model, dbManager, t, onChange],
  )

  useEffect(() => {
    const subscription = dbManager.subscribe(handleOnDbEvent)

    return () => {
      subscription.unsubscribe()
    }
  }, [dbManager, handleOnDbEvent])

  useEffect(() => {
    dbManager.isTableExisted(model)
  }, [model, dbManager])

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
