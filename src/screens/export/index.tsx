import {useCallback, VFC, useState} from 'react'

import {Layout, RangeLoader} from '../../components'
import {Container, Body} from './styles'
import {useI18n} from '../../utils/i18n'
import {ResGetRange, DeviceModel} from '../../contexts/device/types'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')

  const handleOnRange = useCallback<(resGetRange: ResGetRange) => void>((resGetRange) => {
    const {data: d} = resGetRange

    console.log('handleOnRange', d)
  }, [])

  return (
    <Layout title={t('export')}>
      <Container>
        <RangeLoader
          onRange={handleOnRange}
          modelOption={modelOption}
          serialNumberOption={serialNumberOption}
          onModelOptionChange={setModelOption}
          onSerialNumberOptionChange={setSerialNumberOption}
        />
        <Body />
      </Container>
    </Layout>
  )
}

export default Main
