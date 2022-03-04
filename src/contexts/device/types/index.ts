import {ReactNode} from 'react'
import {Subscription} from 'rxjs'
import {IpcRendererEvent} from 'electron'

import {PM2008} from '../models/pm2008/types'
import {CM1106} from '../models/cm1106/types'
import {CM1107} from '../models/cm1107/types'
import {AM1008WK} from '../models/am1008w-k/types'

export type DeviceEventListener = (event: IpcRendererEvent, ...args: any[]) => void

export interface API {
  subscribe: (func: DeviceEventListener) => void
  unsubscribe: (func: DeviceEventListener) => void
  removeAllListeners: () => void
  list: () => void
  add: (path: string, model: DeviceModel) => void
  remove: (path: string) => void
  play: (path: string) => void
  stop: (path: string) => void
  getAppPath: () => void
  getSerialNumbers: (model: DeviceModel) => void
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

export type DeviceEventType = 'LIST' | 'DEVICES' | 'APP_PATH' | 'GET_SERIAL_NUMBERS'

export interface DeviceEvent {
  type: DeviceEventType
  data?
}

export type DeviceModel = 'PM2008' | 'CM1106' | 'AM1008W-K' | 'CM1107'

export interface Device {
  id: string
  model: DeviceModel
  pm2008?: PM2008
  cm1106?: CM1106
  cm1107?: CM1107
  am1008wk?: AM1008WK
  recording: boolean
}

export interface DeviceState {
  devices: Device[]
  dbPath: string
}

export type EventType = 'LIST' | 'APP_PATH'

export interface Event {
  type: EventType
  payload?
}

export type EventListener = (event: Event) => void

export interface DeviceManager {
  list: () => void
  subscribe: (listener: EventListener) => Subscription
  include: (path: string) => boolean
  add: (path: string, model: DeviceModel) => void
  remove: (path: string) => void
  play: (path: string) => void
  stop: (path: string) => void
  getAppPath: () => void
}

export interface Props {
  children: ReactNode
}
