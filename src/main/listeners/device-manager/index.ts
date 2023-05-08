import {BrowserWindow, WebContents, ipcMain} from 'electron'

import {API_NAME} from './constants'
import {Event, AppEventType} from './types'

let webContents: WebContents

const sendEvent: (type: AppEventType, data) => void = (type, data) => {
  if (webContents === undefined || webContents === null) {
    return
  }

  webContents.send(API_NAME, {type, data})
}

const Main: (window: BrowserWindow) => void = (window) => {
  const {webContents: wc} = window

  if (wc === undefined || wc === null) {
    return
  }

  webContents = wc

  ipcMain.on(API_NAME, (_, arg) => {
    if (arg === undefined || arg === null) {
      return
    }

    const {type} = arg as Event

    if (type === undefined || type === null) {
      return
    }

    switch (type) {
      case 'LIST': {
        console.log('I got LIST event!!')
        sendEvent('LIST')
        break
      }
      default:
        break
    }
  })
}

export default Main
