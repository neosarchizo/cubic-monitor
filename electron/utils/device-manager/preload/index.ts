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
  subscribe: (func) => {
    ipcRenderer.on(API_NAME, func)
  },
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners(API_NAME)
  },
  add: (path, model) => {
    sendEvent({type: 'ADD', data: {path, model}})
  },
  remove: (path) => {
    sendEvent({type: 'REMOVE', data: {path}})
  },
  play: (path) => {
    sendEvent({type: 'PLAY', data: {path}})
  },
  stop: (path) => {
    sendEvent({type: 'STOP', data: {path}})
  },
  getAppPath: () => {
    sendEvent({type: 'APP_PATH'})
  },
}

const expose: () => void = () => {
  contextBridge.exposeInMainWorld(API_NAME, api)
}

export default expose
