import {ipcRenderer} from 'electron'

import {DeviceManagerAPI, Event} from './types'
import {API_NAME} from './constants'

const sendEvent: (event: Event) => void = (event) => {
  ipcRenderer.send(API_NAME, event)
}

const Main: DeviceManagerAPI = {
  subscribe: (func) => {
    ipcRenderer.on(API_NAME, func)
  },
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners(API_NAME)
  },
  list: () => {
    sendEvent({type: 'LIST'})
  },
}

export default Main
