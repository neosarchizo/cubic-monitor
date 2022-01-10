import {BrowserWindow, ipcMain, WebContents} from 'electron'

import SerialPort = require('serialport')

import {API_NAME, BAUD_RATE} from './constants'
import {Event, EventType} from './types'

let webContents: WebContents

const sendEvent: (type: EventType, data) => void = (type, data) => {
  if (webContents === undefined || webContents === null) {
    return
  }

  webContents.send(API_NAME, {type, data})
}

const handleOnOpenCmd: (path: string) => SerialPort.ErrorCallback = (path) => (err) => {
  if (err) {
    console.log(`${path} open error`, err)

    return
  }
  console.log(`${path} opened`)
  sendEvent('ADD', path)
}

const main: (window: BrowserWindow) => void = (window) => {
  const {webContents: wc} = window

  if (wc === undefined || wc === null) {
    return
  }

  webContents = wc

  ipcMain.on(API_NAME, (_, arg) => {
    if (arg === undefined || arg === null) {
      return
    }

    const {type, data} = arg as Event

    if (type === undefined || type === null) {
      return
    }

    switch (type) {
      case 'LIST': {
        SerialPort.list().then((result) => {
          sendEvent('LIST', result)
          console.log('LIST', result)
        })

        break
      }
      case 'ADD': {
        const path = data as string

        const port = new SerialPort(path, {
          baudRate: BAUD_RATE,
          autoOpen: false,
        })

        port.open(handleOnOpenCmd(path))
        break
      }

      default:
        break
    }
  })
}

export default main
