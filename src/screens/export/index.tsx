import {VFC} from 'react'

import {Layout} from '../../components'
import {Container, Body} from './styles'
import {useI18n} from '../../utils/i18n'

const Main: VFC = () => {
  const {t} = useI18n()

  return (
    <Layout title={t('export')}>
      <Container>
        <Body />
      </Container>
    </Layout>
  )
}

export default Main
