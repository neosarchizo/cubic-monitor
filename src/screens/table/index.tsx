import {VFC} from 'react'
import {Grid, InputLabel, MenuItem} from '@material-ui/core'

import Layout from '../../components/layout'
import {useI18n} from '../../utils/i18n'
import {Container, GridContainer, MySelect} from './styles'

const Main: VFC = () => {
  const {t} = useI18n()

  return (
    <Layout title={t('table')}>
      <Container>
        <GridContainer>
          <Grid item xs={12} sm={6} md={3}>
            <InputLabel id="lblTest">TEST</InputLabel>
            <MySelect labelId="lblTest">
              <MenuItem>AAA</MenuItem>
            </MySelect>
          </Grid>
        </GridContainer>
      </Container>
    </Layout>
  )
}

export default Main
