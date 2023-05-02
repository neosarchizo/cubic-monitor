import {ElectronAPI} from '@electron-toolkit/preload'

import {API} from './types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
