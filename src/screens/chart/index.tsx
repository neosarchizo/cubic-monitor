import {VFC, useState, useCallback, useMemo, useEffect} from 'react'
import {Grid} from '@material-ui/core'

import {Layout, ModelSelect, RefreshIntervalSelect, SerialNumberSelect} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, GridContainer, Body} from './styles'
import {DeviceModel, EventListener, ResGetData} from '../../contexts/device/types'
import {RefreshIntervalType} from '../../types'
import {useDevice} from '../../contexts/device'
import {useIntervalOnlyEffect} from '../../utils/use-interval'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')
  const [refreshIntervalOption, setRefreshIntervalOption] = useState<RefreshIntervalType>('5_SECS')

  const [, deviceManager] = useDevice()
  const [, setData] = useState<any[]>([])

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

  const handleOnGetData = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      if (type !== 'GET_DATA') {
        return
      }

      const param = payload as ResGetData

      const {model: m, data: d} = param

      if (m !== modelOption) {
        return
      }

      setData(d)
    },
    [modelOption],
  )

  useEffect(() => {
    const sub = deviceManager.subscribe(handleOnGetData)

    return () => {
      sub.unsubscribe()
    }
  }, [deviceManager, handleOnGetData])

  return (
    <Layout title={t('chart')}>
      <Container>
        <GridContainer>
          <Grid item xs={12} sm={6} md={3}>
            <ModelSelect value={modelOption} onChange={setModelOption} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SerialNumberSelect
              model={modelOption}
              value={serialNumberOption}
              onChange={setSerialNumberOption}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <RefreshIntervalSelect
              value={refreshIntervalOption}
              onChange={setRefreshIntervalOption}
            />
          </Grid>
        </GridContainer>
        <Body />
      </Container>
    </Layout>
  )
}

export default Main
