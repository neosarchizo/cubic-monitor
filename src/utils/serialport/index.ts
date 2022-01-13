import {SerialPort, EventListener} from './types'
import {DeviceModel} from '../../contexts/device/types'

declare global {
  interface Window {
    serialport: SerialPort
  }
}

const {serialport} = window

export const list: () => void = () => {
  serialport.list()
}

export const subscribe: (func: EventListener) => void = (func) => {
  serialport.subscribe(func)
}

export const unsubscribe: (func: EventListener) => void = (func) => {
  serialport.unsubscribe(func)
}

export const removeAllListeners: () => void = () => {
  serialport.removeAllListeners()
}

export const add: (path: string, model: DeviceModel) => void = (path, model) => {
  serialport.add(path, model)
}

export const remove: (path: string) => void = (path) => {
  serialport.remove(path)
}

export const play: (path: string) => void = (path) => {
  serialport.play(path)
}

export const stop: (path: string) => void = (path) => {
  serialport.stop(path)
}

export const getAppPath: () => void = () => {
  serialport.getAppPath()
}
