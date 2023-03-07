import {VFC, useState, useCallback, useMemo} from 'react'
import moment from 'moment'

import {Layout, DataLoader, CheckboxInput} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, Body, MyPlot, LegendPanel} from './styles'
import {ResGetData, DeviceModel} from '../../contexts/device/types'
import {
  Trace,
  Layout as LayoutType,
  PM2008LegendState,
  CM1106LegendState,
  CM1107LegendState,
  AM1008WKLegendState,
  CBHCHOV4LegendState,
  AM1002LegendState,
} from './types'
import {CM1106Data} from '../../contexts/device/models/cm1106/types'
import {CM1107Data} from '../../contexts/device/models/cm1107/types'
import {PM2008Data} from '../../contexts/device/models/pm2008/types'
import {AM1008WKData} from '../../contexts/device/models/am1008w-k/types'
import {CBHCHOV4Data} from '../../contexts/device/models/cb-hcho-v4/types'
import {AM1002Data} from '../../contexts/device/models/am1002/types'
import {getTrace} from './helpers'
import {FORMAT_DATA_REVISION} from './constants'
import {useDevice} from '../../contexts/device'
import {Item} from '../../styled-components'

const Main: VFC = () => {
  const {t} = useI18n()

  const [{modelChart, snChart}, deviceManager] = useDevice()

  const [data, setData] = useState<any[]>([])
  const [layout, setLayout] = useState<LayoutType>({
    title: '',
    datarevision: '',
  })
  const [legendsState, setLegendsState] = useState<{
    pm2008: PM2008LegendState
    cm1106: CM1106LegendState
    cm1107: CM1107LegendState
    am1008wk: AM1008WKLegendState
    cbhchov4: CBHCHOV4LegendState
    am1002: AM1002LegendState
  }>({
    pm2008: {
      pm1P0Grimm: false,
      pm2P5Grimm: false,
      pm10PGrimm: false,
      pm1P0Tsi: false,
      pm2P5Tsi: false,
      pm10PTsi: false,
      particleNumber0p3UmAbove: false,
      particleNumber0p5UmAbove: false,
      particleNumber1p0UmAbove: false,
      particleNumber2p5UmAbove: false,
      particleNumber5p0UmAbove: false,
      particleNumber10pUmAbove: false,
    },
    cm1106: {
      co2: false,
    },
    cm1107: {
      co2: false,
    },
    am1008wk: {
      co2: false,
      voc: false,
      relatedHumidity: false,
      temperature: false,
      pm1P0Grimm: false,
      pm2P5Grimm: false,
      pm10PGrimm: false,
      vocNowRef: false,
      vocRefRValue: false,
      vocNowRValue: false,
      pmSensorState: false,
    },
    cbhchov4: {
      hcho: false,
      voc: false,
      temperature: false,
      humidity: false,
      tvoc: false,
      sensorStatus: false,
      autoCalibrationSwitch: false,
    },
    am1002: {
      tvoc: false,
      pm1p0Grimm: false,
      pm2p5Grimm: false,
      pm10pGrimm: false,
      temperature: false,
      humidity: false,
    },
  })

  const traces = useMemo<Trace[]>(() => {
    const newTraces: Trace[] = []

    const {pm2008, cm1106, cm1107, am1008wk, cbhchov4, am1002} = legendsState

    if (snChart === 'NONE') {
      setLayout({
        title: '',
        datarevision: moment().format(FORMAT_DATA_REVISION),
      })
    }

    switch (modelChart) {
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

        const {
          pm1P0Grimm,
          pm2P5Grimm,
          pm10PGrimm,
          pm1P0Tsi,
          pm2P5Tsi,
          pm10PTsi,
          particleNumber0p3UmAbove,
          particleNumber0p5UmAbove,
          particleNumber1p0UmAbove,
          particleNumber2p5UmAbove,
          particleNumber5p0UmAbove,
          particleNumber10pUmAbove,
        } = pm2008

        newTraces.push(getTrace(arrCreatedAt, arrPm1p0Grimm, t('pm1P0Grimm'), pm1P0Grimm))
        newTraces.push(getTrace(arrCreatedAt, arrPm2p5Grimm, t('pm2P5Grimm'), pm2P5Grimm))
        newTraces.push(getTrace(arrCreatedAt, arrPm10pGrimm, t('pm10PGrimm'), pm10PGrimm))
        newTraces.push(getTrace(arrCreatedAt, arrPm1p0Tsi, t('pm1P0Tsi'), pm1P0Tsi))
        newTraces.push(getTrace(arrCreatedAt, arrPm2p5Tsi, t('pm2P5Tsi'), pm2P5Tsi))
        newTraces.push(getTrace(arrCreatedAt, arrPm10pTsi, t('pm10PTsi'), pm10PTsi))
        newTraces.push(
          getTrace(
            arrCreatedAt,
            arrParticleNumber0p3UmAbove,
            t('particleNumber0p3UmAbove'),
            particleNumber0p3UmAbove,
          ),
        )
        newTraces.push(
          getTrace(
            arrCreatedAt,
            arrParticleNumber0p5UmAbove,
            t('particleNumber0p5UmAbove'),
            particleNumber0p5UmAbove,
          ),
        )
        newTraces.push(
          getTrace(
            arrCreatedAt,
            arrParticleNumber1p0UmAbove,
            t('particleNumber1p0UmAbove'),
            particleNumber1p0UmAbove,
          ),
        )
        newTraces.push(
          getTrace(
            arrCreatedAt,
            arrParticleNumber2p5UmAbove,
            t('particleNumber2p5UmAbove'),
            particleNumber2p5UmAbove,
          ),
        )
        newTraces.push(
          getTrace(
            arrCreatedAt,
            arrParticleNumber5p0UmAbove,
            t('particleNumber5p0UmAbove'),
            particleNumber5p0UmAbove,
          ),
        )
        newTraces.push(
          getTrace(
            arrCreatedAt,
            arrParticleNumber10pUmAbove,
            t('particleNumber10pUmAbove'),
            particleNumber10pUmAbove,
          ),
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

        const {co2} = cm1106

        newTraces.push(getTrace(arrCreatedAt, arrCo2, t('co2'), co2))

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

        const {co2} = cm1107

        newTraces.push(getTrace(arrCreatedAt, arrCo2, t('co2'), co2))

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

        const {
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
        } = am1008wk

        newTraces.push(getTrace(arrCreatedAt, arrCo2, t('co2'), co2))
        newTraces.push(getTrace(arrCreatedAt, arrVoc, t('voc'), voc))
        newTraces.push(
          getTrace(arrCreatedAt, arrRelatedHumidity, t('relatedHumidity'), relatedHumidity),
        )
        newTraces.push(getTrace(arrCreatedAt, arrTemperature, t('temperature'), temperature))
        newTraces.push(getTrace(arrCreatedAt, arrPm1P0Grimm, t('pm1P0Grimm'), pm1P0Grimm))
        newTraces.push(getTrace(arrCreatedAt, arrPm2P5Grimm, t('pm2P5Grimm'), pm2P5Grimm))
        newTraces.push(getTrace(arrCreatedAt, arrPm10PGrimm, t('pm10PGrimm'), pm10PGrimm))
        newTraces.push(getTrace(arrCreatedAt, arrVocNowRef, t('vocNowRef'), vocNowRef))
        newTraces.push(getTrace(arrCreatedAt, arrVocRefRValue, t('vocRefRValue'), vocRefRValue))
        newTraces.push(getTrace(arrCreatedAt, arrVocNowRValue, t('vocNowRValue'), vocNowRValue))
        newTraces.push(getTrace(arrCreatedAt, arrPmSensorState, t('pmSensorState'), pmSensorState))

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

        const {hcho, voc, temperature, humidity, tvoc, sensorStatus, autoCalibrationSwitch} =
          cbhchov4

        newTraces.push(getTrace(arrCreatedAt, arrHcho, t('hcho'), hcho))
        newTraces.push(getTrace(arrCreatedAt, arrVoc, t('voc'), voc))
        newTraces.push(getTrace(arrCreatedAt, arrTemperature, t('temperature'), temperature))
        newTraces.push(getTrace(arrCreatedAt, arrHumidity, t('humidity'), humidity))
        newTraces.push(getTrace(arrCreatedAt, arrTvoc, t('tvoc'), tvoc))
        newTraces.push(getTrace(arrCreatedAt, arrSensorStatus, t('sensorStatus'), sensorStatus))
        newTraces.push(
          getTrace(
            arrCreatedAt,
            arrAutoCalibrationSwitch,
            t('autoCalibrationSwitch'),
            autoCalibrationSwitch,
          ),
        )

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
        const {tvoc, pm1p0Grimm, pm2p5Grimm, pm10pGrimm, temperature, humidity} = am1002

        newTraces.push(getTrace(arrCreatedAt, arrTvoc, t('tvoc'), tvoc))
        newTraces.push(getTrace(arrCreatedAt, arrPm1p0Grimm, t('pm1P0Grimm'), pm1p0Grimm))
        newTraces.push(getTrace(arrCreatedAt, arrPm2p5Grimm, t('pm2P5Grimm'), pm2p5Grimm))
        newTraces.push(getTrace(arrCreatedAt, arrPm10pGrimm, t('pm10PGrimm'), pm10pGrimm))
        newTraces.push(getTrace(arrCreatedAt, arrTemperature, t('temperature'), temperature))
        newTraces.push(getTrace(arrCreatedAt, arrHumidity, t('humidity'), humidity))

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
  }, [snChart, modelChart, t, data, legendsState])

  const handleOnData = useCallback<(resGetData: ResGetData) => void>((resGetData) => {
    const {data: d} = resGetData

    setData(d)
  }, [])

  const handleOnGetLegendVisible = useCallback<(model: DeviceModel, attr: string) => boolean>(
    (model, attr) => {
      const {pm2008} = legendsState

      switch (model) {
        case 'PM2008': {
          const {pm10PGrimm, pm2P5Grimm} = pm2008

          switch (attr) {
            case 'pm10PGrimm': {
              return !pm10PGrimm
            }
            case 'pm2P5Grimm': {
              return !pm2P5Grimm
            }
            default:
              break
          }
          break
        }
        default:
          break
      }

      return false
    },
    [legendsState],
  )

  const handleOnSetLegendVisible = useCallback<
    (model: DeviceModel, attr: string) => (value: boolean) => void
  >(
    (model, attr) => (value) => {
      switch (model) {
        case 'PM2008': {
          switch (attr) {
            case 'pm10PGrimm': {
              setLegendsState((v) => {
                const {pm2008} = v

                return {
                  ...v,
                  pm2008: {
                    ...pm2008,
                    pm10PGrimm: !value,
                  },
                }
              })
              break
            }
            case 'pm2P5Grimm': {
              setLegendsState((v) => {
                const {pm2008} = v

                return {
                  ...v,
                  pm2008: {
                    ...pm2008,
                    pm2P5Grimm: !value,
                  },
                }
              })
              break
            }
            default:
              break
          }
          break
        }
        default:
          break
      }
    },
    [],
  )

  return (
    <Layout title={t('chart')}>
      <Container>
        <DataLoader
          onData={handleOnData}
          modelOption={modelChart}
          serialNumberOption={snChart}
          onModelOptionChange={deviceManager.setModelChart}
          onSerialNumberOptionChange={deviceManager.setSnChart}
        />
        <LegendPanel>
          {modelChart === 'PM2008' ? (
            <>
              <Item>
                <CheckboxInput
                  label={t('pm10PGrimm')}
                  name="pm10PGrimm"
                  value={handleOnGetLegendVisible('PM2008', 'pm10PGrimm')}
                  onChange={handleOnSetLegendVisible('PM2008', 'pm10PGrimm')}
                />
              </Item>
              <Item>
                <CheckboxInput
                  label={t('pm2P5Grimm')}
                  name="pm2P5Grimm"
                  value={handleOnGetLegendVisible('PM2008', 'pm2P5Grimm')}
                  onChange={handleOnSetLegendVisible('PM2008', 'pm2P5Grimm')}
                />
              </Item>
            </>
          ) : null}
        </LegendPanel>
        <Body>
          <MyPlot data={traces} layout={layout} />
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
