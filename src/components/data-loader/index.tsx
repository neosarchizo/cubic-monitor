import {FC, useState, useEffect, useMemo, useCallback} from 'react'

import {Container, Item} from './styles'
import {useDevice} from '../../contexts/device'
import {EventListener, ResGetData} from '../../contexts/device/types'
import {RefreshIntervalType} from '../../types'
import ModelSelect from '../model-select'
import RefreshIntervalSelect from '../refresh-interval-select'
import SerialNumberSelect from '../serial-number-select'
import {useIntervalOnlyEffect} from '../../utils/use-interval'
import {Props} from './types'

const Main: FC<Props> = (props) => {
  const {onData, modelOption, serialNumberOption, onModelOptionChange, onSerialNumberOptionChange} =
    props

  const [, deviceManager] = useDevice()

  const [refreshIntervalOption, setRefreshIntervalOption] = useState<RefreshIntervalType>('5_SECS')

  const refreshInterval = useMemo<number | null>(() => {
    let result: number | null = null

    switch (refreshIntervalOption) {
      case '5_SECS': {
        result = 5000
        break
      }
      case '10_SECS': {
        result = 10000
        break
      }
      case '30_SECS': {
        result = 30000
        break
      }
      case '1_MIN': {
        result = 60000
        break
      }
      default:
        break
    }

    return result
  }, [refreshIntervalOption])

  const handleOnIntervalTimeout = useCallback<() => void>(() => {
    if (serialNumberOption === 'NONE') {
      return
    }
    deviceManager.getData(modelOption, serialNumberOption)
  }, [modelOption, serialNumberOption, deviceManager])

  useIntervalOnlyEffect(handleOnIntervalTimeout, refreshInterval)

  useEffect(() => {
    if (serialNumberOption === 'NONE') {
      return
    }
    deviceManager.getData(modelOption, serialNumberOption)
  }, [modelOption, serialNumberOption, deviceManager])

  const handleOnGetData = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      if (type !== 'GET_DATA') {
        return
      }

      const param = payload as ResGetData

      const {model: m} = param

      if (m !== modelOption) {
        return
      }

      onData(param)
    },
    [modelOption, onData],
  )

  useEffect(() => {
    const sub = deviceManager.subscribe(handleOnGetData)

    return () => {
      sub.unsubscribe()
    }
  }, [deviceManager, handleOnGetData])

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
      <Item>
        <RefreshIntervalSelect value={refreshIntervalOption} onChange={setRefreshIntervalOption} />
      </Item>
    </Container>
  )
}

export default Main
