import {useEffect, useState, VFC, useCallback, useMemo} from 'react'
import {Grid} from '@material-ui/core'
import {GridColumns} from '@mui/x-data-grid'

import {Layout, ModelSelect, RefreshIntervalSelect, SerialNumberSelect} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, DataGridContainer, GridContainer, MyDataGrid} from './styles'
import {DeviceModel, EventListener, ResGetData} from '../../contexts/device/types'
import {AM1008WKData} from '../../contexts/device/models/am1008w-k/types'
import {CM1106Data} from '../../contexts/device/models/cm1106/types'
import {CM1107Data} from '../../contexts/device/models/cm1107/types'
import {PM2008Data} from '../../contexts/device/models/pm2008/types'
import {useDevice} from '../../contexts/device'
import {RefreshIntervalType} from '../../types'
import {useIntervalOnlyEffect} from '../../utils/use-interval'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')
  const [refreshIntervalOption, setRefreshIntervalOption] = useState<RefreshIntervalType>('5_SECS')

  const [, deviceManager] = useDevice()
  const [data, setData] = useState<any[]>([])

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

  const columns = useMemo<GridColumns>(() => {
    switch (modelOption) {
      case 'PM2008': {
        return [
          {field: 'createdAt', headerName: t('createdAt'), width: 200},
          {field: 'co2', headerName: t('co2'), width: 150},
          {field: 'pm1p0Grimm', headerName: t('pm1P0Grimm'), width: 150},
          {field: 'pm2p5Grimm', headerName: t('pm2P5Grimm'), width: 150},
          {field: 'pm10pGrimm', headerName: t('pm10PGrimm'), width: 150},
          {field: 'pm1p0Tsi', headerName: t('pm1P0Tsi'), width: 150},
          {field: 'pm2p5Tsi', headerName: t('pm2P5Tsi'), width: 150},
          {field: 'pm10pTsi', headerName: t('pm10PTsi'), width: 150},
          {
            field: 'particleNumber0p3UmAbove',
            headerName: t('particleNumber0p3UmAbove'),
            width: 150,
          },
          {
            field: 'particleNumber0p5UmAbove',
            headerName: t('particleNumber0p5UmAbove'),
            width: 150,
          },
          {
            field: 'particleNumber1p0UmAbove',
            headerName: t('particleNumber1p0UmAbove'),
            width: 150,
          },
          {
            field: 'particleNumber2p5UmAbove',
            headerName: t('particleNumber2p5UmAbove'),
            width: 150,
          },
          {
            field: 'particleNumber5p0UmAbove',
            headerName: t('particleNumber5p0UmAbove'),
            width: 150,
          },
          {
            field: 'particleNumber10pUmAbove',
            headerName: t('particleNumber10pUmAbove'),
            width: 150,
          },
        ]
      }
      case 'CM1106':
      case 'CM1107': {
        return [
          {field: 'createdAt', headerName: t('createdAt'), width: 200},
          {field: 'co2', headerName: t('co2'), width: 150},
        ]
      }
      case 'AM1008W-K': {
        return [
          {field: 'createdAt', headerName: t('createdAt'), width: 200},
          {field: 'co2', headerName: t('co2'), width: 150},
          {field: 'voc', headerName: t('voc'), width: 150},
          {field: 'relatedHumidity', headerName: t('relatedHumidity'), width: 150},
          {field: 'temperature', headerName: t('temperature'), width: 150},
          {field: 'pm1P0Grimm', headerName: t('pm1P0Grimm'), width: 150},
          {field: 'pm2P5Grimm', headerName: t('pm2P5Grimm'), width: 150},
          {field: 'pm10PGrimm', headerName: t('pm10PGrimm'), width: 150},
          {field: 'vocNowRef', headerName: t('vocNowRef'), width: 150},
          {field: 'vocRefRValue', headerName: t('vocRefRValue'), width: 150},
          {field: 'vocNowRValue', headerName: t('vocNowRValue'), width: 150},
          {field: 'pmSensorState', headerName: t('pmSensorState'), width: 150},
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
      case 'PM2008': {
        const pm2008Data = data as PM2008Data[]

        return pm2008Data.map((d) => {
          return {
            id: d[0].toString(),
            createdAt: d[1],
            pm1p0Grimm: d[2],
            pm2p5Grimm: d[3],
            pm10pGrimm: d[4],
            pm1p0Tsi: d[5],
            pm2p5Tsi: d[6],
            pm10pTsi: d[7],
            particleNumber0p3UmAbove: d[8],
            particleNumber0p5UmAbove: d[9],
            particleNumber1p0UmAbove: d[10],
            particleNumber2p5UmAbove: d[11],
            particleNumber5p0UmAbove: d[12],
            particleNumber10pUmAbove: d[13],
          }
        })
      }
      case 'CM1106': {
        const cm1106Data = data as CM1106Data[]

        return cm1106Data.map((d) => {
          return {
            id: d[0].toString(),
            createdAt: d[1],
            co2: d[2],
          }
        })
      }
      case 'CM1107': {
        const cm1107Data = data as CM1107Data[]

        return cm1107Data.map((d) => {
          return {
            id: d[0].toString(),
            createdAt: d[1],
            co2: d[2],
          }
        })
      }
      case 'AM1008W-K': {
        const am1008wkData = data as AM1008WKData[]

        return am1008wkData.map((d) => {
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
          <Grid item xs={12} sm={6} md={3}>
            <RefreshIntervalSelect
              value={refreshIntervalOption}
              onChange={setRefreshIntervalOption}
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
