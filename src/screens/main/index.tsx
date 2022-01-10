import {useCallback, useEffect, useState, VFC} from 'react'
import {Button} from '@material-ui/core'

import {Container} from './styles'
import {useDevice} from '../../contexts/device'
import {EventListener} from '../../contexts/device/types'

const Main: VFC = () => {
  const [msg, setMsg] = useState<string>('waiting...')

  const deviceManager = useDevice()

  const handleOnDeviceEvent = useCallback<EventListener>((event) => {
    const {type, payload} = event

    switch (type) {
      case 'LIST': {
        console.log('LIST', payload)

        let pathList = ''

        payload.forEach((p) => {
          const {path} = p
          pathList += `${path},`
        })

        setMsg(`LIST : ${pathList}`)
        break
      }
      case 'OPEN': {
        setMsg(`OPEN : ${payload}`)
        break
      }

      default:
        break
    }
  }, [])

  // /dev/tty.usbserial-0001

  useEffect(() => {
    const sub = deviceManager.subscribe(handleOnDeviceEvent)
    return () => {
      sub.unsubscribe()
    }
  }, [deviceManager, handleOnDeviceEvent])

  const handleOnTestClick = useCallback<() => void>(() => {
    deviceManager.list()
  }, [deviceManager])

  const handleOnOpenClick = useCallback<() => void>(() => {
    deviceManager.open('/dev/tty.usbserial-0001')
  }, [deviceManager])

  return (
    <Container>
      <div>{msg}</div>
      <Button onClick={handleOnTestClick}>LIST</Button>
      <Button onClick={handleOnOpenClick}>OPEN</Button>
    </Container>
  )
}

export default Main
