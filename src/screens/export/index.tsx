import {useCallback, VFC, useState} from 'react'
import moment from 'moment'

import {Layout, RangeLoader} from '../../components'
import {Container, Body, Item, DateTimePicker} from './styles'
import {useI18n} from '../../utils/i18n'
import {ResGetRange, DeviceModel} from '../../contexts/device/types'
import {RangeType} from './types'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')
  const [startedAt, setStartedAt] = useState<moment.Moment>(moment())

  const handleOnRange = useCallback<(resGetRange: ResGetRange) => void>((resGetRange) => {
    const {data: d} = resGetRange

    console.log('handleOnRange', d)
  }, [])

  const handleOnDateChange = useCallback<(type: RangeType) => (date: any) => void>(
    (type) => (date) => {
      switch (type) {
        case 'STARTED_AT': {
          setStartedAt(date as moment.Moment)
          break
        }
        case 'ENDED_AT': {
          break
        }

        default:
          break
      }
    },
    [],
  )

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
        <Body>
          <Item>
            <DateTimePicker value={startedAt} onChange={handleOnDateChange('STARTED_AT')} />
          </Item>
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
