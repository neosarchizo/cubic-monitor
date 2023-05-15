import {SerialPort} from 'serialport'

import {PM2008} from '../models/pm2008/types'
import {CM1106} from '../models/cm1106/types'
import {CM1107} from '../models/cm1107/types'
import {AM1008WK} from '../models/am1008w-k/types'
import {CBHCHOV4} from '../models/cb-hcho-v4/types'
import {AM1002} from '../models/am1002/types'

export interface Device {
  path: string
  opened: boolean
  port: SerialPort
  model: DeviceModel
  buffer: number[]
  pm2008?: PM2008
  cm1106?: CM1106
  cm1107?: CM1107
  am1008wk?: AM1008WK
  cbhchov4?: CBHCHOV4
  am1002?: AM1002
  tIdMeasure: ReturnType<typeof setInterval> | null
  tIdRecord: ReturnType<typeof setInterval> | null
  recording: boolean
}

export type DFC = (port: SerialPort) => void

export type DPFC = (
  device: Device,
  buffer: number[],
  onClearBuffer: () => void,
  onEvent: (payload) => void,
) => void

export type DeviceModel = 'PM2008' | 'CM1106' | 'AM1008W-K' | 'CM1107' | 'CB-HCHO-V4' | 'AM1002'

export interface AppDevice {
  id: string
  model: DeviceModel
  pm2008?: PM2008
  cm1106?: CM1106
  cm1107?: CM1107
  am1008wk?: AM1008WK
  cbhchov4?: CBHCHOV4
  am1002?: AM1002
  recording: boolean
}

export type EventType =
  | 'LIST'
  | 'ADD'
  | 'REMOVE'
  | 'PLAY'
  | 'STOP'
  | 'APP_PATH'
  | 'GET_SERIAL_NUMBERS'
  | 'GET_DATA'
  | 'GET_RANGE'
  | 'GET_COUNT_BY_RANGE'
  | 'EXPORT_XLSX'

export interface Event {
  type: EventType
  data?
}

export type AppEventType =
  | 'LIST'
  | 'DEVICES'
  | 'APP_PATH'
  | 'GET_SERIAL_NUMBERS'
  | 'GET_DATA'
  | 'GET_RANGE'
  | 'GET_COUNT_BY_RANGE'
  | 'EXPORT_XLSX'

export interface AppEvent {
  type: AppEventType
  data?
}

export interface Range {
  max: string | null
  min: string | null
  count: number
}

export interface ExportXlsxEvent {
  model: string
  serialNumber: string
  type: 'STARTED' | 'FINISHED' | 'FAILED'
  fileName?: string
}
