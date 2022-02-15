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
}
