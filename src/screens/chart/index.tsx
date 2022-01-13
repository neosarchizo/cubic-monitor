import {VFC} from 'react'

import Layout from '../../components/layout'
import {useI18n} from '../../utils/i18n'
import {Container, Body} from './styles'

const Main: VFC = () => {
  const {t} = useI18n()

  return (
    <Layout title={t('chart')}>
      <Container>
        <Body />
      </Container>
    </Layout>
  )
}

export default Main
