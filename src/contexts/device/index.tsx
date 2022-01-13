import {
  createContext,
  useContext,
  useState,
  FC,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react'
import {Subject, Subscription} from 'rxjs'

import * as sp from '../../utils/serialport'
import {EventListener} from '../../utils/serialport/types'
import {DeviceState, DeviceManager, Props, Port, SerialEventPacket, Device, Event} from './types'
import {KEY_DB_PATH} from './constants'

const defaultState: DeviceState = {
  devices: [],
  dbPath: '',
}

const DeviceContext = createContext<[DeviceState, DeviceManager]>([
  defaultState,
  {
    list: () => {},
    subscribe: () => {
      return {} as Subscription
    },
    include: () => false,
    add: () => {},
    remove: () => {},
    play: () => {},
    stop: () => {},
    getAppPath: () => {},
  },
])

export const DeviceProvider: FC<Props> = (props) => {
  const {children} = props

  const [state, setState] = useState<DeviceState>(defaultState)

  const subject = useRef(new Subject<Event>())

  const handleOnSpEvent: EventListener = useCallback(
    (_, ...args) => {
      if (args.length < 1) {
        return
      }

      const packet: SerialEventPacket = args[0]

      const {type, data} = packet

      const {devices} = state

      switch (type) {
        case 'LIST': {
          let ports: Array<Port> = data

          ports = ports.filter((p) => {
            const {path} = p

            return !devices.some((d) => {
              const {id} = d
              return id === path
            })
          })

          subject.current.next({type: 'LIST', payload: ports})
          break
        }
        case 'DEVICES': {
          setState((v) => {
            return {
              ...v,
              devices: data as Device[],
            }
          })
          break
        }
        case 'APP_PATH': {
          localStorage.setItem(KEY_DB_PATH, data)
          setState((v) => {
            return {
              ...v,
              dbPath: data,
            }
          })
          break
        }
        default:
          break
      }
    },
    [state],
  )

  useEffect(() => {
    sp.subscribe(handleOnSpEvent)

    return () => {
      sp.removeAllListeners()
    }
  }, [handleOnSpEvent])

  useEffect(() => {
    const dbPath = localStorage.getItem(KEY_DB_PATH)

    if (dbPath === undefined || dbPath === null) {
      sp.getAppPath()
    } else {
      setState((v) => {
        return {
          ...v,
          dbPath,
        }
      })
    }
  }, [])

  const manager = useMemo<DeviceManager>(() => {
    const {devices} = state

    return {
      list: sp.list,
      subscribe: (listener) => subject.current.subscribe(listener),
      include: (path) =>
        devices.some((d) => {
          const {id} = d
          return id === path
        }),
      add: (path, model) => {
        console.log('ADD', path, model)
        sp.add(path, model)
      },
      remove: (path) => {
        console.log('REMOVE', path)
        sp.remove(path)
      },
      play: (path) => {
        console.log('PLAY', path)
        sp.play(path)
      },
      stop: (path) => {
        console.log('STOP', path)
        sp.stop(path)
      },
      getAppPath: () => {
        sp.getAppPath()
      },
    }
  }, [state])

  const value = useMemo<[DeviceState, DeviceManager]>(() => {
    return [state, manager]
  }, [state, manager])

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}

export const useDevice: () => [DeviceState, DeviceManager] = () => useContext(DeviceContext)
