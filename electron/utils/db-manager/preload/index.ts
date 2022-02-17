import {contextBridge, ipcRenderer} from 'electron'

import {API} from './types'
import {Event} from '../types'
import {API_NAME} from '../constants'

const sendEvent: (event: Event) => void = (event) => {
  ipcRenderer.send(API_NAME, event)
}

const api: API = {
  subscribe: (func) => {
    ipcRenderer.on(API_NAME, func)
  },
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners(API_NAME)
  },
  isTableExisted: (name) => {
    sendEvent({type: 'IS_TABLE_EXISTED', data: {name}})
  },
  getSerialNumbers: (name) => {
    sendEvent({type: 'GET_SERIAL_NUMBERS', data: {name}})
  },
}

const expose: () => void = () => {
  contextBridge.exposeInMainWorld(API_NAME, api)
}

export default expose
