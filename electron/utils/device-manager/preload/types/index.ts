import {IpcRendererEvent} from 'electron'

export type EventListener = (event: IpcRendererEvent, ...args: any[]) => void

export interface API {
  list: () => void
  add: (path: string) => void
  subscribe: (func: EventListener) => void
  removeAllListeners: () => void
}
