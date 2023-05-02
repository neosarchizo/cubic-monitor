import {IpcRendererEvent} from 'electron'

export type EventListener = (event: IpcRendererEvent, ...args: []) => void

export type DeviceModel = 'PM2008' | 'CM1106' | 'AM1008W-K' | 'CM1107' | 'CB-HCHO-V4' | 'AM1002'

export interface DeviceManagerAPI {
  subscribe: (func: EventListener) => void
  removeAllListeners: () => void
  list: () => void
}
