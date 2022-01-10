import {app, BrowserWindow} from 'electron'
import * as path from 'path'
import * as url from 'url'

import deviceManager from './utils/device-manager'

let mainWindow: BrowserWindow | null

const DEBUG = process.env.ELECTRON_DEBUG === 'true'

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 1024,
    x: 50,
    y: 50,
    webPreferences: {
      preload: path.join(__dirname, 'preload'),
      devTools: DEBUG,
    },
  })

  // const menu = Menu.buildFromTemplate(menuTemplate)
  // Menu.setApplicationMenu(menu)

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true,
      }),
  )

  if (DEBUG) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  deviceManager(mainWindow)
}

// app.allowRendererProcessReuse = false

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
