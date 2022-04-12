import {FC, useEffect, useCallback} from 'react'

import {Container, Item} from './styles'
import {useDevice} from '../../contexts/device'
import {EventListener, ResGetRange} from '../../contexts/device/types'
import ModelSelect from '../model-select'
import SerialNumberSelect from '../serial-number-select'
import {Props} from './types'

const Main: FC<Props> = (props) => {
  const {
    onRange,
    modelOption,
    serialNumberOption,
    onModelOptionChange,
    onSerialNumberOptionChange,
  } = props

  const [, deviceManager] = useDevice()

  useEffect(() => {
    if (serialNumberOption === 'NONE') {
      return
    }
    deviceManager.getRange(modelOption, serialNumberOption)
  }, [modelOption, serialNumberOption, deviceManager])

  const handleOnGetRange = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      if (type !== 'GET_RANGE') {
        return
      }

      const param = payload as ResGetRange

      const {model: m} = param

      if (m !== modelOption) {
        return
      }

      onRange(param)
    },
    [modelOption, onRange],
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
    </Container>
  )
}

export default Main
