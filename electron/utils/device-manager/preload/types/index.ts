import {IpcRendererEvent} from 'electron'

import {DeviceModel} from '../../types'

export type EventListener = (event: IpcRendererEvent, ...args: []) => void

export interface API {
  subscribe: (func: EventListener) => void
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
