import {useCallback, VFC, useState, useEffect} from 'react'
import moment from 'moment'

import {Layout, RangeLoader} from '../../components'
import {Container, Body, Item, DateTimePicker, Text, TextContainer} from './styles'
import {useI18n} from '../../utils/i18n'
import {
  ResGetRange,
  DeviceModel,
  EventListener,
  ResGetCountByRange,
} from '../../contexts/device/types'
import {RangeType, Range} from './types'
import {FORMAT_DATETIME} from './constants'
import {useDevice} from '../../contexts/device'

const Main: VFC = () => {
  const {t} = useI18n()

  const [modelOption, setModelOption] = useState<DeviceModel>('PM2008')
  const [serialNumberOption, setSerialNumberOption] = useState<string>('NONE')
  const [startedAt, setStartedAt] = useState<moment.Moment>(moment())
  const [endedAt, setEndedAt] = useState<moment.Moment>(moment())
  const [range, setRange] = useState<Range | null>(null)
  const [count, setCount] = useState<string>('')

  const [, deviceManager] = useDevice()

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

      if (!m.isValid()) {
        setCount('')
        return
      }

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

  useEffect(() => {
    if (serialNumberOption === 'NONE') {
      setCount('')
      return
    }

    deviceManager.getCountByRange(
      modelOption,
      serialNumberOption,
      startedAt.format(FORMAT_DATETIME),
      endedAt.format(FORMAT_DATETIME),
    )
  }, [modelOption, serialNumberOption, startedAt, endedAt, deviceManager])

  const handleOnGetCountByRange = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      if (type !== 'GET_COUNT_BY_RANGE') {
        return
      }

      const param = payload as ResGetCountByRange

      const {model: m, serialNumber: sn, data} = param

      if (m !== modelOption || sn !== serialNumberOption) {
        return
      }

      if (data.length === 0) {
        setCount('')
        return
      }

      const [, , c] = data[0]
      setCount(`${c}건`)
    },
    [modelOption, serialNumberOption],
  )

  useEffect(() => {
    const sub = deviceManager.subscribe(handleOnGetCountByRange)

    return () => {
      sub.unsubscribe()
    }
  }, [deviceManager, handleOnGetCountByRange])

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
              <TextContainer>
                <Text>{count}</Text>
              </TextContainer>
            </>
          ) : null}
        </Body>
      </Container>
    </Layout>
  )
}

export default Main
