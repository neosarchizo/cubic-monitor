import {useState, VFC} from 'react'
import {Grid} from '@material-ui/core'

import {Layout, ModelSelect} from '../../components'
import {useI18n} from '../../utils/i18n'
import {Container, GridContainer} from './styles'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<string>('0')

  return (
    <Layout title={t('table')}>
      <Container>
        <GridContainer>
          <Grid item xs={12} sm={6} md={3}>
            <ModelSelect value={modelOption} onChange={setModelOption} />
          </Grid>
        </GridContainer>
      </Container>
    </Layout>
  )
}

export default Main
