import {FC, useEffect, useCallback, useState} from 'react'

import {Container, Item, Br, Text, TextContainer} from './styles'
import {useDevice} from '../../contexts/device'
import {EventListener, ResGetRange} from '../../contexts/device/types'
import ModelSelect from '../model-select'
import SerialNumberSelect from '../serial-number-select'
import {Props} from './types'
import {useI18n} from '../../utils/i18n'

const Main: FC<Props> = (props) => {
  const {
    onRange,
    modelOption,
    serialNumberOption,
    onModelOptionChange,
    onSerialNumberOptionChange,
  } = props

  const {t} = useI18n()

  const [lblRange, setLblRange] = useState<string>(t('noData'))

  const [, deviceManager] = useDevice()

  useEffect(() => {
    if (serialNumberOption === 'NONE') {
      setLblRange(t('noData'))
      onRange({
        model: modelOption,
        serialNumber: 'NONE',
        data: [],
      })
      return
    }
    deviceManager.getRange(modelOption, serialNumberOption)
  }, [modelOption, serialNumberOption, deviceManager, onRange, t])

  const handleOnGetRange = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      if (type !== 'GET_RANGE') {
        return
      }

      const param = payload as ResGetRange

      const {model: m, serialNumber: sn, data} = param

      if (m !== modelOption || sn !== serialNumberOption) {
        return
      }

      if (data.length === 0) {
        setLblRange(t('noData'))
      } else {
        const [min, max, count] = data[0]

        setLblRange(`${min} ~ ${max} : ${count}건`)
      }

      onRange(param)
    },
    [modelOption, serialNumberOption, onRange, t],
  )

  useEffect(() => {
    const sub = deviceManager.subscribe(handleOnGetRange)

    return () => {
      sub.unsubscribe()
    }
  }, [deviceManager, handleOnGetRange])

  return (
    <Container>
      <Item>
        <ModelSelect value={modelOption} onChange={onModelOptionChange} />
      </Item>
      <Item>
        <SerialNumberSelect
          model={modelOption}
          value={serialNumberOption}
          onChange={onSerialNumberOptionChange}
        />
      </Item>
      <Br />
      <TextContainer>
        <Text>{lblRange}</Text>
      </TextContainer>
    </Container>
  )
}

export default Main
