import {ElectronAPI} from '@electron-toolkit/preload'

import {API} from './api/device-manager/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
