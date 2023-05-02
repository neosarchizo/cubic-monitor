import {contextBridge} from 'electron'
import {electronAPI} from '@electron-toolkit/preload'

import DeviceManager from './api/device-manager'

// Custom APIs for renderer
const api = {
  list: () => {
    console.log('list!!!')
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('deviceManager', DeviceManager)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.deviceManager = DeviceManager
}
