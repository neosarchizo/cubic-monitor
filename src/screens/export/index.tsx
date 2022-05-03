import {useCallback, VFC, useState, useEffect} from 'react'
import moment from 'moment'

import {Layout, RangeLoader} from '../../components'
import {Container, Body, Item, DateTimePicker, Text, TextContainer, Layer} from './styles'
import {useI18n} from '../../utils/i18n'
import {
  ResGetRange,
  DeviceModel,
  EventListener,
  ResGetCountByRange,
  ResExportXlsx,
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
  const [showLayer, setShowLayer] = useState<boolean>(false)

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

  const handleOnDeviceEvent = useCallback<EventListener>(
    (event) => {
      const {type, payload} = event

      switch (type) {
        case 'GET_COUNT_BY_RANGE': {
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
          break
        }
        case 'EXPORT_XLSX': {
          const param = payload as ResExportXlsx

          const {model: m, serialNumber: sn, fileName, type: exportType} = param

          if (m !== modelOption || sn !== serialNumberOption) {
            return
          }

          switch (exportType) {
            case 'STARTED': {
              setShowLayer(true)
              break
            }
            case 'FAILED': {
              setShowLayer(false)
              break
            }
            case 'FINISHED': {
              setShowLayer(false)
              console.log('path', fileName)
              break
            }
            default:
              break
          }
          break
        }

        default:
          break
      }
    },
    [modelOption, serialNumberOption],
  )

  useEffect(() => {
    const sub = deviceManager.subscribe(handleOnDeviceEvent)

    return () => {
      sub.unsubscribe()
    }
  }, [deviceManager, handleOnDeviceEvent])

  return (
    <>
      <Layout title={t('export')} hideAppBar={showLayer}>
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
      {showLayer ? <Layer /> : null}
    </>
  )
}

export default Main
