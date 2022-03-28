import {VFC, useState, useCallback, useMemo} from 'react'

import {Layout, DataLoader} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, Body, MyPlot} from './styles'
import {ResGetData, DeviceModel} from '../../contexts/device/types'
import {Trace} from './types'
import {CM1107Data} from '../../contexts/device/models/cm1107/types'

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
        break
      }
      case 'CM1106': {
        break
      }
      case 'CM1107': {
        // id, createdAt, co2

        const cm1107Data = data as CM1107Data[]

        const co2Trace: Trace = {
          x: [],
          y: [],
          type: 'scatter',
          name: t('co2'),
          visible: 'True',
        }

        const {x, y} = co2Trace

        cm1107Data.reverse().forEach((d) => {
          const [, createdAt, co2] = d

          x.push(createdAt)
          y.push(co2)
        })

        newTraces.push(co2Trace)

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
