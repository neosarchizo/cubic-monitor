import {useState, VFC, useCallback, useMemo} from 'react'
import {GridColumns} from '@mui/x-data-grid'

import {Layout, DataLoader} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, Body, MyDataGrid} from './styles'
import {ResGetData} from '../../contexts/device/types'
import {AM1008WKData} from '../../contexts/device/models/am1008w-k/types'
import {CM1106Data} from '../../contexts/device/models/cm1106/types'
import {CM1107Data} from '../../contexts/device/models/cm1107/types'
import {PM2008Data} from '../../contexts/device/models/pm2008/types'
import {CBHCHOV4Data} from '../../contexts/device/models/cb-hcho-v4/types'
import {AM1002Data} from '../../contexts/device/models/am1002/types'
import {useDevice} from '../../contexts/device'

const Main: VFC = () => {
  const {t} = useI18n()

  const [{modelTable, snTable}, deviceManager] = useDevice()

  const [data, setData] = useState<any[]>([])

  const columns = useMemo<GridColumns>(() => {
    switch (modelTable) {
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
      case 'CB-HCHO-V4': {
        return [
          {field: 'createdAt', headerName: t('createdAt'), width: 200},
          {field: 'hcho', headerName: t('hcho'), width: 150},
          {field: 'voc', headerName: t('voc'), width: 150},
          {field: 'temperature', headerName: t('temperature'), width: 150},
          {field: 'humidity', headerName: t('humidity'), width: 150},
          {field: 'tvoc', headerName: t('tvoc'), width: 150},
          {field: 'sensorStatus', headerName: t('sensorStatus'), width: 150},
          {field: 'autoCalibrationSwitch', headerName: t('autoCalibrationSwitch'), width: 150},
        ]
      }
      case 'AM1002': {
        return [
          {field: 'createdAt', headerName: t('createdAt'), width: 200},
          {field: 'tvoc', headerName: t('tvoc'), width: 150},
          {field: 'pm1p0Grimm', headerName: t('pm1P0Grimm'), width: 150},
          {field: 'pm2p5Grimm', headerName: t('pm2P5Grimm'), width: 150},
          {field: 'pm10pGrimm', headerName: t('pm10PGrimm'), width: 150},
          {field: 'temperature', headerName: t('temperature'), width: 150},
          {field: 'humidity', headerName: t('humidity'), width: 150},
        ]
      }
      default:
        break
    }

    return [
      {field: 'id', headerName: t('path'), width: 300},
      {field: 'model', headerName: t('model'), width: 150},
    ]
  }, [t, modelTable])

  const records = useMemo<any[]>(() => {
    if (snTable === 'NONE') {
      return []
    }

    switch (modelTable) {
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
      case 'CB-HCHO-V4': {
        const cbhchoData = data as CBHCHOV4Data[]

        return cbhchoData.map((d) => {
          return {
            id: d[0].toString(),
            createdAt: d[1],
            hcho: d[2],
            voc: d[3],
            temperature: d[4],
            humidity: d[5],
            tvoc: d[6],
            sensorStatus: d[7],
            autoCalibrationSwitch: d[8],
          }
        })
      }
      case 'AM1002': {
        const am1002Data = data as AM1002Data[]

        return am1002Data.map((d) => {
          return {
            id: d[0].toString(),
            createdAt: d[1],
            tvoc: d[2],
            pm1p0Grimm: d[2],
            pm2p5Grimm: d[3],
            pm10pGrimm: d[4],
            temperature: d[5],
            humidity: d[6],
          }
        })
      }
      default:
        break
    }

    return []
  }, [modelTable, snTable, data])

  const handleOnData = useCallback<(resGetData: ResGetData) => void>((resGetData) => {
    const {data: d} = resGetData

    setData(d)
  }, [])

  return (
    <Layout title={t('table')}>
      <Container>
        <DataLoader
          onData={handleOnData}
          modelOption={modelTable}
          serialNumberOption={snTable}
          onModelOptionChange={deviceManager.setModelTable}
          onSerialNumberOptionChange={deviceManager.setSnTable}
        />
        <Body>
          <MyDataGrid rows={records} columns={columns} />
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
