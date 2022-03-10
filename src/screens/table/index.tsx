import {useEffect, useState, VFC, useCallback} from 'react'
import {Grid} from '@material-ui/core'

import {Layout, ModelSelect, SerialNumberSelect} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, GridContainer} from './styles'
import {DeviceModel, EventListener, ResGetData} from '../../contexts/device/types'
import {useDevice} from '../../contexts/device'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')

  const [, deviceManager] = useDevice()

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

      const {model: m, data} = param

      if (m !== modelOption) {
        return
      }

      console.log('here!!!', data)
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
    <Layout title={t('table')}>
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
        </GridContainer>
      </Container>
    </Layout>
  )
}

export default Main
