import {FC, useCallback, ChangeEvent, useState, useEffect} from 'react'
import {InputLabel, MenuItem} from '@material-ui/core'

import {useI18n} from '../../utils/i18n'
import {Props, ModelOption} from './types'
import {MySelect} from './styles'
import {useDevice} from '../../contexts/device'
import {EventListener, ResGetSerialNumbers} from '../../contexts/device/types'

const Main: FC<Props> = (props) => {
  const {t} = useI18n()
  const [, deviceManager] = useDevice()

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

  useEffect(() => {
    deviceManager.getSerialNumbers(model)
  }, [deviceManager, model])

  const handleOnGetSerialNumbers = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      if (type !== 'GET_SERIAL_NUMBERS') {
        return
      }

      const param = payload as ResGetSerialNumbers

      const {model: m, serialNumbers} = param

      if (m !== model) {
        return
      }

      if (serialNumbers.length === 0) {
        setOptions([{id: 'NONE', name: t('none')}])
        onChange('NONE')
        return
      }

      setOptions(
        serialNumbers.map((sn) => {
          return {
            id: sn,
            name: sn,
          }
        }),
      )
      onChange(serialNumbers[0])
    },
    [model, t, onChange],
  )

  useEffect(() => {
    const sub = deviceManager.subscribe(handleOnGetSerialNumbers)

    return () => {
      sub.unsubscribe()
    }
  }, [deviceManager, handleOnGetSerialNumbers])

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
