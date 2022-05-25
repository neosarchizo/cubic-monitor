import {Device, DeviceModel} from '../types'
import * as PM2008 from './pm2008'
import * as CM1106 from './cm1106'
import * as CM1107 from './cm1107'
import * as AM1008WK from './am1008w-k'
import * as CBHCHOV4 from './cb-hcho-v4'

export const open: (device: Device) => void = (device) => {
  const {model, port} = device

  switch (model) {
    case 'PM2008': {
      PM2008.readSerialNumber(port)
      break
    }
    case 'CM1106': {
      CM1106.readSerialNumber(port)
      break
    }
    case 'CM1107': {
      CM1107.readSerialNumber(port)
      break
    }
    case 'AM1008W-K': {
      AM1008WK.readSerialNumber(port)
      break
    }
    case 'CB-HCHO-V4': {
      CBHCHOV4.readSerialNumber(port)
      break
    }

    default:
      break
  }
}

export const parse: (
  device: Device,
  buffer: number[],
  onClearBuffer: () => void,
  onEvent: (payload) => void,
) => void = (device, buffer, onClearBuffer, onEvent) => {
  const {model} = device

  switch (model) {
    case 'PM2008': {
      PM2008.parse(device, buffer, onClearBuffer, onEvent)
      break
    }
    case 'CM1106': {
      CM1106.parse(device, buffer, onClearBuffer, onEvent)
      break
    }
    case 'CM1107': {
      CM1107.parse(device, buffer, onClearBuffer, onEvent)
      break
    }
    case 'AM1008W-K': {
      AM1008WK.parse(device, buffer, onClearBuffer, onEvent)
      break
    }
    case 'CB-HCHO-V4': {
      CBHCHOV4.parse(device, buffer, onClearBuffer, onEvent)
      break
    }

    default:
      break
  }
}

export const measure: (device: Device) => void = (device) => {
  const {model, port} = device

  switch (model) {
    case 'PM2008': {
      PM2008.readParticleMeasurementResult(port)
      break
    }
    case 'CM1106': {
      CM1106.readMeasuredCo2Result(port)
      break
    }
    case 'CM1107': {
      CM1107.readMeasuredCo2Result(port)
      break
    }
    case 'AM1008W-K': {
      AM1008WK.readMeasuredResult(port)
      break
    }
    case 'CB-HCHO-V4': {
      CBHCHOV4.read(port)
      break
    }

    default:
      break
  }
}

export const record: (device: Device) => void = (device) => {
  const {model} = device

  switch (model) {
    case 'PM2008': {
      PM2008.record(device)
      break
    }
    case 'CM1106': {
      CM1106.record(device)
      break
    }
    case 'CM1107': {
      CM1107.record(device)
      break
    }
    case 'AM1008W-K': {
      AM1008WK.record(device)
      break
    }
    case 'CB-HCHO-V4': {
      CBHCHOV4.record(device)
      break
    }

    default:
      break
  }
}

export const getSerialNumbers: (
  model: DeviceModel,
  callback: (result: string[]) => void,
) => void = (model, callback) => {
  switch (model) {
    case 'PM2008': {
      PM2008.getSerialNumbers(callback)
      break
    }
    case 'CM1106': {
      CM1106.getSerialNumbers(callback)
      break
    }
    case 'CM1107': {
      CM1107.getSerialNumbers(callback)
      break
    }
    case 'AM1008W-K': {
      AM1008WK.getSerialNumbers(callback)
      break
    }
    case 'CB-HCHO-V4': {
      // TODO
      break
    }

    default:
      break
  }
}

export const getData: (
  model: DeviceModel,
  serialNumber: string,
  callback: (results: any[]) => void,
) => void = (model, serialNumber, callback) => {
  switch (model) {
    case 'PM2008': {
      PM2008.getData(serialNumber, callback)
      break
    }
    case 'CM1106': {
      CM1106.getData(serialNumber, callback)
      break
    }
    case 'CM1107': {
      CM1107.getData(serialNumber, callback)
      break
    }
    case 'AM1008W-K': {
      AM1008WK.getData(serialNumber, callback)
      break
    }
    case 'CB-HCHO-V4': {
      // TODO
      break
    }
    default:
      break
  }
}
