import {VFC, useState, useCallback} from 'react'

import {Layout, DataLoader} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, Body, MyPlot} from './styles'
import {ResGetData, DeviceModel} from '../../contexts/device/types'

const Main: VFC = () => {
  const {t} = useI18n()

  const [, setData] = useState<any[]>([])
  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')

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
          <MyPlot
            data={[
              {
                x: [1, 2, 3],
                y: [2, 6, 3],
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
              },
              {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
            ]}
            layout={{title: 'A Fancy Plot'}}
          />
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
