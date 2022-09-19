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

  const [refreshIntervalOption, setRefreshIntervalOption] = useState<RefreshIntervalType>('1_SEC')

  const refreshInterval = useMemo<number | null>(() => {
    let result: number | null = null

    switch (refreshIntervalOption) {
      case '1_SEC': {
        result = 1000
        break
      }
      case '6_SECS': {
        result = 6000
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
      onData({model: modelOption, serialNumber: 'NONE', data: []})
      return
    }
    deviceManager.getData(modelOption, serialNumberOption)
  }, [modelOption, serialNumberOption, deviceManager, onData])

  useIntervalOnlyEffect(handleOnIntervalTimeout, refreshInterval)

  useEffect(() => {
    if (serialNumberOption === 'NONE') {
      onData({model: modelOption, serialNumber: 'NONE', data: []})
      return
    }
    deviceManager.getData(modelOption, serialNumberOption)
  }, [modelOption, serialNumberOption, deviceManager, onData])

  const handleOnGetData = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      if (type !== 'GET_DATA') {
        return
      }

      const param = payload as ResGetData

      const {model: m, serialNumber: sn} = param

      if (m !== modelOption || sn !== serialNumberOption) {
        return
      }

      onData(param)
    },
    [modelOption, serialNumberOption, onData],
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
