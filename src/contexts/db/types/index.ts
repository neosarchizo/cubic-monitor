import {ReactNode} from 'react'
import {Subscription} from 'rxjs'
import {IpcRendererEvent} from 'electron'

export type DbEventListener = (event: IpcRendererEvent, ...args: any[]) => void

export interface API {
  subscribe: (func: DbEventListener) => void
  removeAllListeners: () => void
  isTableExisted: (name: string) => void
  getSerialNumbers: (name: string) => void
  getData: (name: string, serialNumber: string) => void
}

export type DbEventType = 'IS_TABLE_EXISTED' | 'GET_SERIAL_NUMBERS' | 'GET_DATA'

export interface DbEvent {
  type: DbEventType
  data?
}

export type EventType = 'IS_TABLE_EXISTED' | 'GET_SERIAL_NUMBERS' | 'GET_DATA'

export interface Event {
  type: EventType
  payload?
}

export type EventListener = (event: Event) => void

export interface DbManager {
  subscribe: (listener: EventListener) => Subscription
  isTableExisted: (name: string) => void
  getSerialNumbers: (name: string) => void
  getData: (name: string, serialNumber: string) => void
}

export interface Props {
  children: ReactNode
}
