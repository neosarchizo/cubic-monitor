import {VFC, useState, useCallback, useMemo} from 'react'
import moment from 'moment'

import {Layout, DataLoader} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, Body, MyPlot} from './styles'
import {ResGetData, DeviceModel} from '../../contexts/device/types'
import {Trace, Layout as LayoutType} from './types'
import {CM1106Data} from '../../contexts/device/models/cm1106/types'
import {CM1107Data} from '../../contexts/device/models/cm1107/types'
import {PM2008Data} from '../../contexts/device/models/pm2008/types'
import {AM1008WKData} from '../../contexts/device/models/am1008w-k/types'
import {CBHCHOV4Data} from '../../contexts/device/models/cb-hcho-v4/types'
import {AM1002Data} from '../../contexts/device/models/am1002/types'
import {getTrace} from './helpers'
import {FORMAT_DATA_REVISION} from './constants'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')
  const [data, setData] = useState<any[]>([])
  const [layout, setLayout] = useState<LayoutType>({
    title: '',
    datarevision: '',
  })

  const traces = useMemo<Trace[]>(() => {
    const newTraces: Trace[] = []

    if (serialNumberOption === 'NONE') {
      setLayout({
        title: '',
        datarevision: moment().format(FORMAT_DATA_REVISION),
      })
    }

    switch (modelOption) {
      case 'PM2008': {
        // id, createdAt
        const pm2008Data = data as PM2008Data[]

        if (pm2008Data.length === 0) {
          setLayout({
            title: t('pm2008'),
            datarevision: moment().format(FORMAT_DATA_REVISION),
          })
          break
        }

        const arrCreatedAt: string[] = []

        const arrPm1p0Grimm: number[] = []
        const arrPm2p5Grimm: number[] = []
        const arrPm10pGrimm: number[] = []
        const arrPm1p0Tsi: number[] = []
        const arrPm2p5Tsi: number[] = []
        const arrPm10pTsi: number[] = []
        const arrParticleNumber0p3UmAbove: number[] = []
        const arrParticleNumber0p5UmAbove: number[] = []
        const arrParticleNumber1p0UmAbove: number[] = []
        const arrParticleNumber2p5UmAbove: number[] = []
        const arrParticleNumber5p0UmAbove: number[] = []
        const arrParticleNumber10pUmAbove: number[] = []

        pm2008Data.forEach((d) => {
          const [
            ,
            createdAt,
            pm1p0Grimm,
            pm2p5Grimm,
            pm10pGrimm,
            pm1p0Tsi,
            pm2p5Tsi,
            pm10pTsi,
            particleNumber0p3UmAbove,
            particleNumber0p5UmAbove,
            particleNumber1p0UmAbove,
            particleNumber2p5UmAbove,
            particleNumber5p0UmAbove,
            particleNumber10pUmAbove,
          ] = d

          arrCreatedAt.push(createdAt)
          arrPm1p0Grimm.push(pm1p0Grimm)
          arrPm2p5Grimm.push(pm2p5Grimm)
          arrPm10pGrimm.push(pm10pGrimm)
          arrPm1p0Tsi.push(pm1p0Tsi)
          arrPm2p5Tsi.push(pm2p5Tsi)
          arrPm10pTsi.push(pm10pTsi)
          arrParticleNumber0p3UmAbove.push(particleNumber0p3UmAbove)
          arrParticleNumber0p5UmAbove.push(particleNumber0p5UmAbove)
          arrParticleNumber1p0UmAbove.push(particleNumber1p0UmAbove)
          arrParticleNumber2p5UmAbove.push(particleNumber2p5UmAbove)
          arrParticleNumber5p0UmAbove.push(particleNumber5p0UmAbove)
          arrParticleNumber10pUmAbove.push(particleNumber10pUmAbove)
        })

        newTraces.push(getTrace(arrCreatedAt, arrPm1p0Grimm, t('pm1P0Grimm')))
        newTraces.push(getTrace(arrCreatedAt, arrPm2p5Grimm, t('pm2P5Grimm')))
        newTraces.push(getTrace(arrCreatedAt, arrPm10pGrimm, t('pm10PGrimm')))
        newTraces.push(getTrace(arrCreatedAt, arrPm1p0Tsi, t('pm1P0Tsi')))
        newTraces.push(getTrace(arrCreatedAt, arrPm2p5Tsi, t('pm2P5Tsi')))
        newTraces.push(getTrace(arrCreatedAt, arrPm10pTsi, t('pm10PTsi')))
        newTraces.push(
          getTrace(arrCreatedAt, arrParticleNumber0p3UmAbove, t('particleNumber0p3UmAbove')),
        )
        newTraces.push(
          getTrace(arrCreatedAt, arrParticleNumber0p5UmAbove, t('particleNumber0p5UmAbove')),
        )
        newTraces.push(
          getTrace(arrCreatedAt, arrParticleNumber1p0UmAbove, t('particleNumber1p0UmAbove')),
        )
        newTraces.push(
          getTrace(arrCreatedAt, arrParticleNumber2p5UmAbove, t('particleNumber2p5UmAbove')),
        )
        newTraces.push(
          getTrace(arrCreatedAt, arrParticleNumber5p0UmAbove, t('particleNumber5p0UmAbove')),
        )
        newTraces.push(
          getTrace(arrCreatedAt, arrParticleNumber10pUmAbove, t('particleNumber10pUmAbove')),
        )

        setLayout({
          title: t('pm2008'),
          datarevision: moment().format(FORMAT_DATA_REVISION),
        })
        break
      }
      case 'CM1106': {
        // id, createdAt, co2

        const cm1106Data = data as CM1106Data[]

        if (cm1106Data.length === 0) {
          setLayout({
            title: t('cm1106'),
            datarevision: moment().format(FORMAT_DATA_REVISION),
          })
          break
        }

        const arrCreatedAt: string[] = []
        const arrCo2: number[] = []

        cm1106Data.forEach((d) => {
          const [, createdAt, co2] = d

          arrCreatedAt.push(createdAt)
          arrCo2.push(co2)
        })

        newTraces.push(getTrace(arrCreatedAt, arrCo2, t('co2')))

        setLayout({
          title: t('cm1106'),
          datarevision: moment().format(FORMAT_DATA_REVISION),
        })
        break
      }
      case 'CM1107': {
        // id, createdAt, co2

        const cm1107Data = data as CM1107Data[]

        if (cm1107Data.length === 0) {
          setLayout({
            title: t('cm1107'),
            datarevision: moment().format(FORMAT_DATA_REVISION),
          })
          break
        }

        const arrCreatedAt: string[] = []
        const arrCo2: number[] = []

        cm1107Data.forEach((d) => {
          const [, createdAt, co2] = d

          arrCreatedAt.push(createdAt)
          arrCo2.push(co2)
        })

        newTraces.push(getTrace(arrCreatedAt, arrCo2, t('co2')))

        setLayout({
          title: t('cm1107'),
          datarevision: moment().format(FORMAT_DATA_REVISION),
        })
        break
      }
      case 'AM1008W-K': {
        const am1008wkData = data as AM1008WKData[]

        if (am1008wkData.length === 0) {
          setLayout({
            title: t('am1008wk'),
            datarevision: moment().format(FORMAT_DATA_REVISION),
          })
          break
        }

        const arrCreatedAt: string[] = []
        const arrCo2: number[] = []
        const arrVoc: number[] = []
        const arrRelatedHumidity: number[] = []
        const arrTemperature: number[] = []
        const arrPm1P0Grimm: number[] = []
        const arrPm2P5Grimm: number[] = []
        const arrPm10PGrimm: number[] = []
        const arrVocNowRef: number[] = []
        const arrVocRefRValue: number[] = []
        const arrVocNowRValue: number[] = []
        const arrPmSensorState: number[] = []

        am1008wkData.forEach((d) => {
          const [
            ,
            createdAt,
            co2,
            voc,
            relatedHumidity,
            temperature,
            pm1P0Grimm,
            pm2P5Grimm,
            pm10PGrimm,
            vocNowRef,
            vocRefRValue,
            vocNowRValue,
            pmSensorState,
          ] = d

          arrCreatedAt.push(createdAt)
          arrCo2.push(co2)
          arrVoc.push(voc)
          arrRelatedHumidity.push(relatedHumidity)
          arrTemperature.push(temperature)
          arrPm1P0Grimm.push(pm1P0Grimm)
          arrPm2P5Grimm.push(pm2P5Grimm)
          arrPm10PGrimm.push(pm10PGrimm)
          arrVocNowRef.push(vocNowRef)
          arrVocRefRValue.push(vocRefRValue)
          arrVocNowRValue.push(vocNowRValue)
          arrPmSensorState.push(pmSensorState)
        })

        newTraces.push(getTrace(arrCreatedAt, arrCo2, t('co2')))
        newTraces.push(getTrace(arrCreatedAt, arrVoc, t('voc')))
        newTraces.push(getTrace(arrCreatedAt, arrRelatedHumidity, t('relatedHumidity')))
        newTraces.push(getTrace(arrCreatedAt, arrTemperature, t('temperature')))
        newTraces.push(getTrace(arrCreatedAt, arrPm1P0Grimm, t('pm1P0Grimm')))
        newTraces.push(getTrace(arrCreatedAt, arrPm2P5Grimm, t('pm2P5Grimm')))
        newTraces.push(getTrace(arrCreatedAt, arrPm10PGrimm, t('pm10PGrimm')))
        newTraces.push(getTrace(arrCreatedAt, arrVocNowRef, t('vocNowRef')))
        newTraces.push(getTrace(arrCreatedAt, arrVocRefRValue, t('vocRefRValue')))
        newTraces.push(getTrace(arrCreatedAt, arrVocNowRValue, t('vocNowRValue')))
        newTraces.push(getTrace(arrCreatedAt, arrPmSensorState, t('pmSensorState')))

        setLayout({
          title: t('am1008wk'),
          datarevision: moment().format(FORMAT_DATA_REVISION),
        })
        break
      }
      case 'CB-HCHO-V4': {
        const cbhchov4Data = data as CBHCHOV4Data[]

        if (cbhchov4Data.length === 0) {
          setLayout({
            title: t('cbhchov4'),
            datarevision: moment().format(FORMAT_DATA_REVISION),
          })
        }

        const arrCreatedAt: string[] = []
        const arrHcho: number[] = []
        const arrVoc: number[] = []
        const arrTemperature: number[] = []
        const arrHumidity: number[] = []
        const arrTvoc: number[] = []
        const arrSensorStatus: number[] = []
        const arrAutoCalibrationSwitch: number[] = []

        cbhchov4Data.forEach((d) => {
          const [
            ,
            createdAt,
            hcho,
            voc,
            temperature,
            humidity,
            tvoc,
            sensorStatus,
            autoCalibrationSwitch,
          ] = d

          arrCreatedAt.push(createdAt)
          arrHcho.push(hcho)
          arrVoc.push(voc)
          arrTemperature.push(temperature)
          arrHumidity.push(humidity)
          arrTvoc.push(tvoc)
          arrSensorStatus.push(sensorStatus)
          arrAutoCalibrationSwitch.push(autoCalibrationSwitch)
        })

        newTraces.push(getTrace(arrCreatedAt, arrHcho, t('hcho')))
        newTraces.push(getTrace(arrCreatedAt, arrVoc, t('voc')))
        newTraces.push(getTrace(arrCreatedAt, arrTemperature, t('temperature')))
        newTraces.push(getTrace(arrCreatedAt, arrHumidity, t('humidity')))
        newTraces.push(getTrace(arrCreatedAt, arrTvoc, t('tvoc')))
        newTraces.push(getTrace(arrCreatedAt, arrSensorStatus, t('sensorStatus')))
        newTraces.push(getTrace(arrCreatedAt, arrAutoCalibrationSwitch, t('autoCalibrationSwitch')))

        setLayout({
          title: t('cbhchov4'),
          datarevision: moment().format(FORMAT_DATA_REVISION),
        })
        break
      }
      case 'AM1002': {
        const am1002Data = data as AM1002Data[]

        if (am1002Data.length === 0) {
          setLayout({
            title: t('am1002'),
            datarevision: moment().format(FORMAT_DATA_REVISION),
          })
          break
        }

        const arrCreatedAt: string[] = []

        const arrTvoc: number[] = []
        const arrPm1p0Grimm: number[] = []
        const arrPm2p5Grimm: number[] = []
        const arrPm10pGrimm: number[] = []
        const arrTemperature: number[] = []
        const arrHumidity: number[] = []

        am1002Data.forEach((d) => {
          const [, createdAt, tvoc, pm1p0Grimm, pm2p5Grimm, pm10pGrimm, temperature, humidity] = d

          arrCreatedAt.push(createdAt)
          arrTvoc.push(tvoc)
          arrPm1p0Grimm.push(pm1p0Grimm)
          arrPm2p5Grimm.push(pm2p5Grimm)
          arrPm10pGrimm.push(pm10pGrimm)
          arrTemperature.push(temperature)
          arrHumidity.push(humidity)
        })

        newTraces.push(getTrace(arrCreatedAt, arrTvoc, t('tvoc')))
        newTraces.push(getTrace(arrCreatedAt, arrPm1p0Grimm, t('pm1P0Grimm')))
        newTraces.push(getTrace(arrCreatedAt, arrPm2p5Grimm, t('pm2P5Grimm')))
        newTraces.push(getTrace(arrCreatedAt, arrPm10pGrimm, t('pm10PGrimm')))
        newTraces.push(getTrace(arrCreatedAt, arrTemperature, t('temperature')))
        newTraces.push(getTrace(arrCreatedAt, arrHumidity, t('humidity')))

        setLayout({
          title: t('am1002'),
          datarevision: moment().format(FORMAT_DATA_REVISION),
        })
        break
      }
      default:
        break
    }

    return newTraces
  }, [serialNumberOption, modelOption, t, data])

  const handleOnData = useCallback<(resGetData: ResGetData) => void>((resGetData) => {
    const {data: d} = resGetData

    setData(d)
  }, [])

  return (
    <Layout title={t('chart')}>
      <Container>
        <DataLoader
          onData={handleOnData}
          modelOption={modelOption}
          serialNumberOption={serialNumberOption}
          onModelOptionChange={setModelOption}
          onSerialNumberOptionChange={setSerialNumberOption}
        />
        <Body>
          <MyPlot data={traces} layout={layout} />
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
