import {FC, createContext, useContext, useMemo, useEffect, useCallback, useRef} from 'react'
import {Subject, Subscription} from 'rxjs'

import {DeviceManager, Props, API, SerialEventListener, SerialEvent, Port, Event} from './types'

declare global {
  interface Window {
    deviceManager: API
  }
}

const {deviceManager} = window

const DeviceContext = createContext<DeviceManager>({
  list: () => {},
  open: () => {},
  subscribe: () => {
    return {} as Subscription
  },
})

export const DeviceProvider: FC<Props> = (props) => {
  const {children} = props

  const subject = useRef<Subject<Event>>(new Subject())

  const manager = useMemo<DeviceManager>(() => {
    return {
      list: () => {
        deviceManager.list()
      },
      open: (path) => {
        deviceManager.add(path)
      },
      subscribe: (listener) => subject.current.subscribe(listener),
    }
  }, [])

  const handleOnEvent = useCallback<SerialEventListener>((_, ...args) => {
    if (args.length < 1) {
      return
    }

    const event: SerialEvent = args[0]

    const {type, data} = event

    switch (type) {
      case 'LIST': {
        const ports: Port[] = data
        subject.current.next({type: 'LIST', payload: ports})
        break
      }
      case 'ADD': {
        subject.current.next({type: 'OPEN', payload: data})
        break
      }

      default:
        break
    }
  }, [])

  useEffect(() => {
    deviceManager.subscribe(handleOnEvent)
    return () => {
      deviceManager.removeAllListeners()
    }
  }, [handleOnEvent])

  return <DeviceContext.Provider value={manager}>{children}</DeviceContext.Provider>
}

export const useDevice: () => DeviceManager = () => useContext(DeviceContext)
