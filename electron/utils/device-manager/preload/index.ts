import {contextBridge, ipcRenderer} from 'electron'

import {API} from './types'
import {Event} from '../types'
import {API_NAME} from '../constants'

const sendEvent: (event: Event) => void = (event) => {
  ipcRenderer.send(API_NAME, event)
}

const api: API = {
  list: () => {
    sendEvent({type: 'LIST'})
  },
  add: (path) => {
    sendEvent({type: 'ADD', data: path})
  },
  subscribe: (func) => {
    ipcRenderer.on(API_NAME, func)
  },
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners(API_NAME)
  },
}

const expose: () => void = () => {
  contextBridge.exposeInMainWorld(API_NAME, api)
}

export default expose
