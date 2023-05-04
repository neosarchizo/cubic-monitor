import {IpcRendererEvent} from 'electron'

export type EventListener = (event: IpcRendererEvent, ...args: []) => void

export type DeviceModel = 'PM2008' | 'CM1106' | 'AM1008W-K' | 'CM1107' | 'CB-HCHO-V4' | 'AM1002'

export interface DeviceManagerAPI {
  subscribe: (func: EventListener) => void
  removeAllListeners: () => void
  list: () => void
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
