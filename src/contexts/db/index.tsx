import {createContext, useContext, FC, useEffect, useCallback, useRef, useMemo} from 'react'
import {Subject, Subscription} from 'rxjs'

import {Props, Event, API, DbManager, DbEventListener, DbEvent} from './types'

declare global {
  interface Window {
    dbManager: API
  }
}

const {dbManager} = window

const DbContext = createContext<[DbManager]>([
  {
    subscribe: () => {
      return {} as Subscription
    },
    isTableExisted: () => {},
    getSerialNumbers: () => {},
  },
])

export const DbProvider: FC<Props> = (props) => {
  const {children} = props

  const subject = useRef(new Subject<Event>())

  const handleOnDbEvent: DbEventListener = useCallback((_, ...args) => {
    if (args.length < 1) {
      return
    }

    const packet: DbEvent = args[0]

    const {type, data} = packet

    switch (type) {
      case 'IS_TABLE_EXISTED': {
        subject.current.next({type: 'IS_TABLE_EXISTED', payload: data})
        break
      }
      case 'GET_SERIAL_NUMBERS': {
        subject.current.next({type: 'GET_SERIAL_NUMBERS', payload: data})
        break
      }

      default:
        break
    }
  }, [])

  useEffect(() => {
    dbManager.subscribe(handleOnDbEvent)

    return () => {
      dbManager.removeAllListeners()
    }
  }, [handleOnDbEvent])

  const manager = useMemo<DbManager>(() => {
    return {
      subscribe: (listener) => subject.current.subscribe(listener),
      isTableExisted: dbManager.isTableExisted,
      getSerialNumbers: dbManager.getSerialNumbers,
    }
  }, [])

  const value = useMemo<[DbManager]>(() => {
    return [manager]
  }, [manager])

  return <DbContext.Provider value={value}>{children}</DbContext.Provider>
}

export const useDb: () => [DbManager] = () => useContext(DbContext)
