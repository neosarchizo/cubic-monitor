import {useCallback, VFC, useState} from 'react'
import moment from 'moment'

import {Layout, RangeLoader} from '../../components'
import {Container, Body, Item, DateTimePicker} from './styles'
import {useI18n} from '../../utils/i18n'
import {ResGetRange, DeviceModel} from '../../contexts/device/types'
import {RangeType, Range} from './types'
import {FORMAT_DATETIME} from './constants'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')
  const [startedAt, setStartedAt] = useState<moment.Moment>(moment())
  const [endedAt, setEndedAt] = useState<moment.Moment>(moment())
  const [range, setRange] = useState<Range | null>(null)

  const handleOnRange = useCallback<(resGetRange: ResGetRange) => void>((resGetRange) => {
    const {data: d} = resGetRange

    if (d.length === 0) {
      setRange(null)
      return
    }

    const [s, e, c] = d[0]

    setRange({
      startedAt: moment(s, FORMAT_DATETIME),
      endedAt: moment(e, FORMAT_DATETIME),
      count: c,
    })

    setStartedAt(moment(s, FORMAT_DATETIME))
    setEndedAt(moment(e, FORMAT_DATETIME))
  }, [])

  const handleOnDateChange = useCallback<(type: RangeType) => (date: any) => void>(
    (type) => (date) => {
      const m = date as moment.Moment

      switch (type) {
        case 'STARTED_AT': {
          setStartedAt(m)
          break
        }
        case 'ENDED_AT': {
          setEndedAt(m)
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
          {range ? (
            <>
              <Item>
                <DateTimePicker value={startedAt} onChange={handleOnDateChange('STARTED_AT')} />
              </Item>
              <Item>
                <DateTimePicker value={endedAt} onChange={handleOnDateChange('ENDED_AT')} />
              </Item>
            </>
          ) : null}
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
