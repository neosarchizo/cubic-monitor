import {app, BrowserWindow, WebContents, ipcMain} from 'electron'

import Sqlite3 = require('sqlite3')
import path = require('path')

import {API_NAME} from './constants'
import {AppEventType, Event} from './types'
import {QUERY_IS_TABLE_EXISTED, QUERY_GET_SERIAL_NUMBERS} from './queries'

let webContents: WebContents

export const getDb: () => Sqlite3.Database = () => {
  return new Sqlite3.Database(path.join(app.getPath('downloads'), 'cubic.db'))
}

const sendEvent: (type: AppEventType, data) => void = (type, data) => {
  if (webContents === undefined || webContents === null) {
    return
  }

  webContents.send(API_NAME, {type, data})
}

export const main: (window: BrowserWindow) => void = (window) => {
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
      case 'IS_TABLE_EXISTED': {
        const param = data as {name: string}

        const {name} = param

        const db = getDb()

        db.each(
          QUERY_IS_TABLE_EXISTED(name),
          () => {},
          (err, count) => {
            if (err !== undefined && err !== null) {
              console.log('QUERY_IS_TABLE_EXISTED failed', err)

              sendEvent('IS_TABLE_EXISTED', {name, existed: false})
              return
            }

            if (count === 0) {
              sendEvent('IS_TABLE_EXISTED', {name, existed: false})
              return
            }

            sendEvent('IS_TABLE_EXISTED', {name, existed: true})
          },
        )

        db.close()
        break
      }
      case 'GET_SERIAL_NUMBERS': {
        const param = data as {name: string}

        const {name} = param

        const db = getDb()

        const serialNumbers: string[] = []

        db.each(
          QUERY_GET_SERIAL_NUMBERS(name),
          (err, row) => {
            if (err !== undefined && err !== null) {
              return
            }

            const record = row as {SERIAL_NUMBER: string}

            const {SERIAL_NUMBER} = record

            serialNumbers.push(SERIAL_NUMBER)
          },
          (err, count) => {
            if (err !== undefined && err !== null) {
              console.log('QUERY_GET_SERIAL_NUMBERS failed', err)

              sendEvent('GET_SERIAL_NUMBERS', {name, serialNumbers})
              return
            }

            if (count === 0) {
              sendEvent('GET_SERIAL_NUMBERS', {name, serialNumbers})
              return
            }

            sendEvent('GET_SERIAL_NUMBERS', {name, serialNumbers})
          },
        )

        db.close()

        console.log('GET_SERIAL_NUMBERS', data)
        break
      }
      default:
        break
    }
  })
}

export default main
