import {VFC, useState, useCallback} from 'react'
import Plot from 'react-plotly.js'

import {Layout, DataLoader} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, Body} from './styles'
import {ResGetData} from '../../contexts/device/types'

const Main: VFC = () => {
  const {t} = useI18n()

  const [, setData] = useState<any[]>([])

  const handleOnData = useCallback<(resGetData: ResGetData) => void>((resGetData) => {
    const {data: d} = resGetData

    setData(d)
  }, [])

  return (
    <Layout title={t('chart')}>
      <Container>
        <DataLoader onData={handleOnData} />
        <Body>
          <Plot
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
            layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
          />
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
