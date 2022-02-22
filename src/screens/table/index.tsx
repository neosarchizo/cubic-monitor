import {useState, VFC} from 'react'
import {Grid} from '@material-ui/core'

import {Layout, ModelSelect, SerialNumberSelect} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, GridContainer} from './styles'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<string>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')

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
