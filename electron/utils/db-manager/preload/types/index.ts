import {IpcRendererEvent} from 'electron'

export type EventListener = (event: IpcRendererEvent, ...args: []) => void

export interface API {
  subscribe: (func: EventListener) => void
  removeAllListeners: () => void
  isTableExisted: (name: string) => void
  getSerialNumbers: (name: string) => void
}
