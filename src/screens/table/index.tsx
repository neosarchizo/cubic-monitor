import {useEffect, useState, VFC, useCallback, useMemo} from 'react'
import {Grid} from '@material-ui/core'
import {GridColumns} from '@mui/x-data-grid'

import {Layout, ModelSelect, SerialNumberSelect} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, DataGridContainer, GridContainer, MyDataGrid} from './styles'
import {DeviceModel, EventListener, ResGetData} from '../../contexts/device/types'
import {AM1008WKData} from '../../contexts/device/models/am1008w-k/types'
import {useDevice} from '../../contexts/device'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')

  const [, deviceManager] = useDevice()
  const [data, setData] = useState<any[]>([])

  const columns = useMemo<GridColumns>(() => {
    switch (modelOption) {
      case 'AM1008W-K': {
        return [
          {field: 'createdAt', headerName: t('createdAt'), width: 300},
          {field: 'co2', headerName: t('co2'), width: 300},
          {field: 'voc', headerName: t('voc'), width: 300},
          {field: 'relatedHumidity', headerName: t('relatedHumidity'), width: 300},
          {field: 'temperature', headerName: t('temperature'), width: 300},
          {field: 'pm1P0Grimm', headerName: t('pm1P0Grimm'), width: 300},
          {field: 'pm2P5Grimm', headerName: t('pm2P5Grimm'), width: 300},
          {field: 'pm10PGrimm', headerName: t('pm10PGrimm'), width: 300},
          {field: 'vocNowRef', headerName: t('vocNowRef'), width: 300},
          {field: 'vocRefRValue', headerName: t('vocRefRValue'), width: 300},
          {field: 'vocNowRValue', headerName: t('vocNowRValue'), width: 300},
          {field: 'pmSensorState', headerName: t('pmSensorState'), width: 300},
        ]
      }
      default:
        break
    }

    return [
      {field: 'id', headerName: t('path'), width: 300},
      {field: 'model', headerName: t('model'), width: 150},
    ]
  }, [t, modelOption])

  const records = useMemo<any[]>(() => {
    if (serialNumberOption === 'NONE') {
      return []
    }

    switch (modelOption) {
      case 'AM1008W-K': {
        const am1008wkData = data as AM1008WKData[]

        return am1008wkData.slice(1).map((d) => {
          return {
            id: d[0].toString(),
            createdAt: d[1],
            co2: d[2],
            voc: d[3],
            relatedHumidity: d[4],
            temperature: d[5],
            pm1P0Grimm: d[6],
            pm2P5Grimm: d[7],
            pm10PGrimm: d[8],
            vocNowRef: d[9],
            vocRefRValue: d[10],
            vocNowRValue: d[11],
            pmSensorState: d[12],
          }
        })
      }
      default:
        break
    }

    return []
  }, [modelOption, serialNumberOption, data])

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
        <DataGridContainer>
          <MyDataGrid rows={records} columns={columns} />
        </DataGridContainer>
      </Container>
    </Layout>
  )
}

export default Main
