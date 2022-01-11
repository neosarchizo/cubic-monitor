import {BrowserWindow, ipcMain, WebContents, app} from 'electron'

import SerialPort = require('serialport')

import {Device, Event, AppEventType, AppDevice} from './types'
import {API_NAME, BAUD_RATE} from './constants'
import * as ModelManager from './models'
import {PM2008Event} from './models/pm2008/types'
import {CM1106Event} from './models/cm1106/types'
import {CM1107Event} from './models/cm1107/types'
import * as PM2008 from './models/pm2008'
import * as CM1106 from './models/cm1106'
import * as CM1107 from './models/cm1107'
import * as AM1008WK from './models/am1008w-k'
import {AM1008WKEvent} from './models/am1008w-k/types'

let devices: Array<Device> = []

let webContents: WebContents

const sendEvent: (type: AppEventType, data) => void = (type, data) => {
  if (webContents === undefined || webContents === null) {
    return
  }

  webContents.send(API_NAME, {type, data})
}

const getDevice: (path: string) => Device | undefined = (path) => {
  return devices.find((d) => {
    const {path: p} = d
    return p === path
  })
}

const getAppDevices: () => AppDevice[] = () => {
  return devices.map((d) => {
    const {path, model, pm2008, cm1106, cm1107, am1008wk, recording} = d

    return {
      id: path,
      model,
      pm2008,
      cm1106,
      cm1107,
      am1008wk,
      recording,
    }
  })
}

const clearBuffer: (path: string) => void = (path) => {
  devices = devices.map((d) => {
    const {path: p} = d

    if (path !== p) {
      return d
    }

    return {
      ...d,
      buffer: [],
    }
  })
}

const measure: (path: string) => () => void = (path) => () => {
  const device = getDevice(path)

  if (device === undefined || device === null) {
    console.log('port not existed')
    return
  }

  ModelManager.measure(device)
}

const record: (path: string) => () => void = (path) => () => {
  const device = getDevice(path)

  if (device === undefined || device === null) {
    console.log('port not existed')
    return
  }

  ModelManager.record(device)
}

const sendDevices: () => void = () => {
  sendEvent('DEVICES', getAppDevices())
}

const handleOnOpen = (path: string) => () => {
  console.log('OPEN', path)

  sendDevices()
}

const handleOnError = (path: string) => (data?) => {
  console.log('error', path, data)
}

const handleOnClose = (path: string) => () => {
  console.log('CLOSE', path)
}

const handleOnClearBuffer = (path: string) => () => {
  console.log('CLEAR BUFFER', path)

  devices = devices.map((d) => {
    const {path: p} = d

    if (p !== path) {
      return d
    }

    return {
      ...d,
      buffer: [],
    }
  })
}

// event
const handleOnModelEvent = (path: string) => (payload) => {
  const device = getDevice(path)

  if (device === undefined || device === null) {
    console.log('device is not available')
    return
  }

  const {model, port} = device

  switch (model) {
    case 'PM2008': {
      const {type, data} = payload as PM2008Event

      switch (type) {
        case 'SERIAL_NUMBER': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {pm2008} = d

            return {
              ...d,
              pm2008: PM2008.updateProp('SERIAL_NUMBER', pm2008, data),
            }
          })

          PM2008.readSoftwareVersionNumber(port)

          sendDevices()
          break
        }
        case 'SW_VER': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {pm2008} = d

            return {
              ...d,
              pm2008: PM2008.updateProp('SW_VER', pm2008, data),
            }
          })

          sendDevices()
          break
        }
        case 'MEASURE': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {pm2008} = d

            return {
              ...d,
              pm2008: PM2008.updateProp('MEASURE', pm2008, data),
            }
          })

          sendDevices()
          break
        }

        default:
          break
      }

      break
    }
    case 'CM1106': {
      const {type, data} = payload as CM1106Event

      switch (type) {
        case 'SERIAL_NUMBER': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {cm1106} = d

            return {
              ...d,
              cm1106: CM1106.updateProp('SERIAL_NUMBER', cm1106, data),
            }
          })

          CM1106.readSoftwareVersionNumber(port)

          sendDevices()
          break
        }
        case 'SW_VER': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {cm1106} = d

            return {
              ...d,
              cm1106: CM1106.updateProp('SW_VER', cm1106, data),
            }
          })

          sendDevices()
          break
        }
        case 'MEASURE': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {cm1106} = d

            return {
              ...d,
              cm1106: CM1106.updateProp('MEASURE', cm1106, data),
            }
          })

          sendDevices()
          break
        }

        default:
          break
      }

      break
    }
    case 'CM1107': {
      const {type, data} = payload as CM1107Event

      switch (type) {
        case 'SERIAL_NUMBER': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {cm1107} = d

            return {
              ...d,
              cm1107: CM1107.updateProp('SERIAL_NUMBER', cm1107, data),
            }
          })

          CM1107.readSoftwareVersionNumber(port)

          sendDevices()
          break
        }
        case 'SW_VER': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {cm1107} = d

            return {
              ...d,
              cm1107: CM1107.updateProp('SW_VER', cm1107, data),
            }
          })

          sendDevices()
          break
        }
        case 'MEASURE': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {cm1107} = d

            return {
              ...d,
              cm1107: CM1107.updateProp('MEASURE', cm1107, data),
            }
          })

          sendDevices()
          break
        }

        default:
          break
      }

      break
    }
    case 'AM1008W-K': {
      const {type, data} = payload as AM1008WKEvent

      switch (type) {
        case 'SERIAL_NUMBER': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {am1008wk} = d

            return {
              ...d,
              am1008wk: AM1008WK.updateProp('SERIAL_NUMBER', am1008wk, data),
            }
          })

          AM1008WK.readSoftwareVersionNumber(port)

          sendDevices()
          break
        }
        case 'SW_VER': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {am1008wk} = d

            return {
              ...d,
              am1008wk: AM1008WK.updateProp('SW_VER', am1008wk, data),
            }
          })

          sendDevices()
          break
        }
        case 'MEASURE': {
          devices = devices.map((d) => {
            const {path: p} = d
            if (p !== path) {
              return d
            }

            const {am1008wk} = d

            return {
              ...d,
              am1008wk: AM1008WK.updateProp('MEASURE', am1008wk, data),
            }
          })

          sendDevices()
          break
        }

        default:
          break
      }

      break
    }
    default:
      break
  }
}

const handleOnData = (path: string) => (data) => {
  const device = getDevice(path)

  if (device === undefined || device === null) {
    console.log('device is not available')
    return
  }

  const {buffer} = device

  buffer.push(data[0])

  ModelManager.parse(device, buffer, handleOnClearBuffer(path), handleOnModelEvent(path))
}

const handleOnOpenCmd: (path: string) => SerialPort.ErrorCallback = (path) => (err) => {
  if (err) {
    console.log(`${path} open error`, err)

    devices = devices.filter((device) => {
      const {path: p} = device
      return p !== path
    })
    return
  }
  console.log(`${path} opened`)

  devices = devices.map((device) => {
    const {path: existedPath} = device

    if (path !== existedPath) {
      return device
    }

    return {
      ...device,
      opened: true,
    }
  })

  const device = getDevice(path)

  if (device === undefined || device === null) {
    return
  }

  clearBuffer(path)
  ModelManager.open(device)
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
      case 'LIST': {
        SerialPort.list().then((result) => {
          sendEvent('LIST', result)
        })
        break
      }

      case 'ADD': {
        if (data === undefined || data === null) {
          break
        }

        const {path, model} = data

        if (path === undefined || path === null) {
          break
        }

        if (model === undefined || model === null) {
          break
        }

        if (
          devices.some((d) => {
            const {path: existedPath} = d
            return path === existedPath
          })
        ) {
          console.log('port already existed')
          break
        }

        const port = new SerialPort(path, {baudRate: BAUD_RATE, autoOpen: false})

        port.on('open', handleOnOpen(path))

        port.on('error', handleOnError(path))

        port.on('close', handleOnClose(path))

        port.on('data', handleOnData(path))

        const newDevice: Device = {
          path,
          port,
          opened: false,
          model,
          buffer: [],
          tIdMeasure: null,
          tIdRecord: null,
          recording: false,
        }

        devices.push(newDevice)

        port.open(handleOnOpenCmd(path))

        sendDevices()
        break
      }

      case 'REMOVE': {
        if (data === undefined || data === null) {
          break
        }

        const {path} = data

        if (path === undefined || path === null) {
          break
        }

        const device = getDevice(path)

        if (device === undefined || device === null) {
          console.log('port not existed')
          break
        }

        const {port, tIdMeasure, tIdRecord} = device

        if (tIdMeasure !== null) {
          clearInterval(tIdMeasure)
        }

        if (tIdRecord !== null) {
          clearInterval(tIdRecord)
        }

        port.close()

        devices = devices.filter((d) => {
          const {path: existedPath} = d
          return path !== existedPath
        })

        sendDevices()
        break
      }
      case 'PLAY': {
        if (data === undefined || data === null) {
          break
        }

        const {path} = data

        if (path === undefined || path === null) {
          break
        }

        devices = devices.map((d) => {
          const {path: p, tIdMeasure, tIdRecord} = d

          if (path !== p) {
            return d
          }

          if (tIdMeasure !== null) {
            clearInterval(tIdMeasure)
          }

          if (tIdRecord !== null) {
            clearInterval(tIdRecord)
          }

          return {
            ...d,
            tIdRecord: setInterval(record(path), 333),
            tIdMeasure: setInterval(measure(path), 333),
            recording: true,
          }
        })

        sendDevices()
        break
      }
      case 'STOP': {
        if (data === undefined || data === null) {
          break
        }

        const {path} = data

        if (path === undefined || path === null) {
          break
        }

        devices = devices.map((d) => {
          const {path: p, tIdMeasure, tIdRecord} = d

          if (path !== p) {
            return d
          }

          if (tIdMeasure !== null) {
            clearInterval(tIdMeasure)
          }

          if (tIdRecord !== null) {
            clearInterval(tIdRecord)
          }

          return {
            ...d,
            tIdRecord: null,
            tIdMeasure: null,
            recording: false,
          }
        })

        sendDevices()
        break
      }
      case 'APP_PATH': {
        sendEvent('APP_PATH', app.getPath('downloads'))
        break
      }
      default:
        break
    }
  })
}

export default main
