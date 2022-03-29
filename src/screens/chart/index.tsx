import {VFC, useState, useCallback, useMemo} from 'react'

import {Layout, DataLoader} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, Body, MyPlot} from './styles'
import {ResGetData, DeviceModel} from '../../contexts/device/types'
import {Trace} from './types'
import {CM1106Data} from '../../contexts/device/models/cm1106/types'
import {CM1107Data} from '../../contexts/device/models/cm1107/types'
import {PM2008Data} from '../../contexts/device/models/pm2008/types'
import {getTrace} from './helpers'

const Main: VFC = () => {
  const {t} = useI18n()

  const [data, setData] = useState<any[]>([])
  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')

  const traces = useMemo<Trace[]>(() => {
    const newTraces: Trace[] = []

    if (serialNumberOption === 'NONE') {
      return newTraces
    }

    switch (modelOption) {
      case 'PM2008': {
        // id, createdAt
        const pm2008Data = data as PM2008Data[]

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
        break
      }
      case 'CM1106': {
        // id, createdAt, co2

        const cm1106Data = data as CM1106Data[]

        const arrCreatedAt: string[] = []
        const arrCo2: number[] = []

        cm1106Data.forEach((d) => {
          const [, createdAt, co2] = d

          arrCreatedAt.push(createdAt)
          arrCo2.push(co2)
        })

        newTraces.push(getTrace(arrCreatedAt, arrCo2, t('co2')))
        break
      }
      case 'CM1107': {
        // id, createdAt, co2

        const cm1107Data = data as CM1107Data[]

        const arrCreatedAt: string[] = []
        const arrCo2: number[] = []

        cm1107Data.forEach((d) => {
          const [, createdAt, co2] = d

          arrCreatedAt.push(createdAt)
          arrCo2.push(co2)
        })

        newTraces.push(getTrace(arrCreatedAt, arrCo2, t('co2')))
        break
      }
      case 'AM1008W-K': {
        break
      }
      default:
        break
    }

    return newTraces
  }, [serialNumberOption, modelOption, data, t])

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
          <MyPlot data={traces} layout={{title: 'A Fancy Plot'}} />
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
