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

import {
  DeviceState,
  DeviceManager,
  Props,
  Port,
  DeviceEvent,
  Device,
  Event,
  API,
  DeviceEventListener,
} from './types'
import {KEY_DB_PATH} from './constants'

declare global {
  interface Window {
    deviceManager: API
  }
}

const {deviceManager} = window

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
    getSerialNumbers: () => {},
    getData: () => {},
    getRange: () => {},
    getCountByRange: () => {},
    exportXlsx: () => {},
  },
])

export const DeviceProvider: FC<Props> = (props) => {
  const {children} = props

  const [state, setState] = useState<DeviceState>(defaultState)

  const subject = useRef(new Subject<Event>())

  const handleOnDeviceEvent: DeviceEventListener = useCallback(
    (_, ...args) => {
      if (args.length < 1) {
        return
      }

      const packet: DeviceEvent = args[0]

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
        case 'GET_SERIAL_NUMBERS': {
          subject.current.next({type: 'GET_SERIAL_NUMBERS', payload: data})
          break
        }
        case 'GET_DATA': {
          subject.current.next({type: 'GET_DATA', payload: data})
          break
        }
        case 'GET_RANGE': {
          subject.current.next({type: 'GET_RANGE', payload: data})
          break
        }
        case 'GET_COUNT_BY_RANGE': {
          subject.current.next({type: 'GET_COUNT_BY_RANGE', payload: data})
          break
        }
        case 'EXPORT_XLSX': {
          subject.current.next({type: 'EXPORT_XLSX', payload: data})
          break
        }
        default:
          break
      }
    },
    [state],
  )

  useEffect(() => {
    deviceManager.subscribe(handleOnDeviceEvent)

    return () => {
      deviceManager.removeAllListeners()
    }
  }, [handleOnDeviceEvent])

  useEffect(() => {
    const dbPath = localStorage.getItem(KEY_DB_PATH)

    if (dbPath === undefined || dbPath === null) {
      deviceManager.getAppPath()
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
      list: deviceManager.list,
      subscribe: (listener) => subject.current.subscribe(listener),
      include: (path) =>
        devices.some((d) => {
          const {id} = d
          return id === path
        }),
      add: (path, model) => {
        console.log('ADD', path, model)
        deviceManager.add(path, model)
      },
      remove: (path) => {
        console.log('REMOVE', path)
        deviceManager.remove(path)
      },
      play: (path) => {
        console.log('PLAY', path)
        deviceManager.play(path)
      },
      stop: (path) => {
        console.log('STOP', path)
        deviceManager.stop(path)
      },
      getAppPath: () => {
        deviceManager.getAppPath()
      },
      getSerialNumbers: (model) => {
        deviceManager.getSerialNumbers(model)
      },
      getData: (model, serialNumber) => {
        deviceManager.getData(model, serialNumber)
      },
      getRange: (model, serialNumber) => {
        deviceManager.getRange(model, serialNumber)
      },
      getCountByRange: (model, serialNumber, startedAt, endedAt) => {
        deviceManager.getCountByRange(model, serialNumber, startedAt, endedAt)
      },
      exportXlsx: (model, serialNumber, startedAt, endedAt) => {
        deviceManager.exportXlsx(model, serialNumber, startedAt, endedAt)
      },
    }
  }, [state])

  const value = useMemo<[DeviceState, DeviceManager]>(() => {
    return [state, manager]
  }, [state, manager])

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
}

export const useDevice: () => [DeviceState, DeviceManager] = () => useContext(DeviceContext)
