import {ReactNode} from 'react'
import {Subscription} from 'rxjs'
import {IpcRendererEvent} from 'electron'

import {PM2008} from '../models/pm2008/types'
import {CM1106} from '../models/cm1106/types'
import {CM1107} from '../models/cm1107/types'
import {AM1008WK} from '../models/am1008w-k/types'
import {CBHCHOV4} from '../models/cb-hcho-v4/types'

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
  getData: (model: DeviceModel, serialNumber: string) => void
  getRange: (model: DeviceModel, serialNumber: string) => void
  getCountByRange: (
    model: DeviceModel,
    serialNumber: string,
    startedAt: string,
    endedAt: string,
  ) => void
  exportXlsx: (model: DeviceModel, serialNumber: string, startedAt: string, endedAt: string) => void
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

export type DeviceEventType =
  | 'LIST'
  | 'DEVICES'
  | 'APP_PATH'
  | 'GET_SERIAL_NUMBERS'
  | 'GET_DATA'
  | 'GET_RANGE'
  | 'GET_COUNT_BY_RANGE'
  | 'EXPORT_XLSX'

export interface DeviceEvent {
  type: DeviceEventType
  data?
}

export type DeviceModel = 'PM2008' | 'CM1106' | 'AM1008W-K' | 'CM1107' | 'CB-HCHO-V4'

export interface Device {
  id: string
  model: DeviceModel
  pm2008?: PM2008
  cm1106?: CM1106
  cm1107?: CM1107
  am1008wk?: AM1008WK
  cbhchov4?: CBHCHOV4
  recording: boolean
}

export interface DeviceState {
  devices: Device[]
  dbPath: string
}

export type EventType =
  | 'LIST'
  | 'APP_PATH'
  | 'GET_SERIAL_NUMBERS'
  | 'GET_DATA'
  | 'GET_RANGE'
  | 'GET_COUNT_BY_RANGE'
  | 'EXPORT_XLSX'

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
  getSerialNumbers: (model: DeviceModel) => void
  getData: (model: DeviceModel, serialNumber: string) => void
  getRange: (model: DeviceModel, serialNumber: string) => void
  getCountByRange: (
    model: DeviceModel,
    serialNumber: string,
    startedAt: string,
    endedAt: string,
  ) => void
  exportXlsx: (model: DeviceModel, serialNumber: string, startedAt: string, endedAt: string) => void
}

export interface Props {
  children: ReactNode
}

export interface ResGetSerialNumbers {
  model: DeviceModel
  serialNumbers: string[]
}

export interface ResGetData {
  model: DeviceModel
  serialNumber: string
  data: any[]
}

export interface ResGetRange {
  model: DeviceModel
  serialNumber: string
  data: [string, string, number][]
}

export interface ResGetCountByRange {
  model: DeviceModel
  serialNumber: string
  data: [string, string, number][]
}

export interface ResExportXlsx {
  model: DeviceModel
  serialNumber: string
  type: 'STARTED' | 'FINISHED' | 'FAILED'
  fileName?: string
}
