import {ReactNode} from 'react'
import {IpcRendererEvent} from 'electron'
import {Subscription} from 'rxjs'

export type SerialEventListener = (event: IpcRendererEvent, ...args: any[]) => void

export interface API {
  list: () => void
  add: (path: string) => void
  subscribe: (func: SerialEventListener) => void
  removeAllListeners: () => void
}

export interface Props {
  children: ReactNode
}

export interface Device {
  id: string
}

export type EventType = 'LIST' | 'APP_PATH' | 'OPEN'

export interface Event {
  type: EventType
  payload?: any
}

export type EventListener = (event: Event) => void

export interface DeviceManager {
  list: () => void
  open: (path: string) => void
  subscribe: (listener: EventListener) => Subscription
}

export type SerialEventType = 'LIST' | 'ADD'

export interface SerialEvent {
  type: SerialEventType
  data?
}

export interface Port {
  path: string
  manufacturer?: string | undefined
  serialNumber?: string | undefined
  pnpId?: string | undefined
  locationId?: string | undefined
  productId?: string | undefined
  vendorId?: string | undefined
}
