/* eslint-disable no-bitwise */
import moment = require('moment')

import {DFC, DPFC, Device} from '../../types'
import Packet from '../../../../utils/packet'
import {CMD_READ, CMD_AUTO_CALIBRATION} from './constants'
import {FRAME_SEND_STX, FRAME_RESP_STX} from '../../../../utils/packet/constants'
import {CBHCHOV4Event, CBHCHOV4PropType, CBHCHOV4, MeasureData, Data} from './types'
import * as DB from '../../../../utils/db-manager'
import {FORMAT_TIME} from '../constants'
import {
  QUERY_CREATE_TABLE,
  QUERY_INSERT_INTO,
  QUERY_GET_SERIAL_NUMBERS,
  QUERY_GET_DATA,
} from './queries'

const timeTable: {[sn: string]: string} = {}

export const read: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_READ)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const autoCalibration: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_AUTO_CALIBRATION)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const readSerialNumber: DFC = (port) => {
  console.log('CB-HCHO-V4::readSerialNumber')
  const packet = new Packet()
  packet.generate(CMD_READ)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const parse: DPFC = (device, buffer, onClearBuffer, onEvent) => {
  if (buffer[0] !== FRAME_SEND_STX && buffer[0] !== FRAME_RESP_STX) {
    onClearBuffer()
    return
  }

  if (buffer.length < 4) {
    return
  }

  if (buffer.length < buffer[1] + 3) {
    return
  }

  const packet = new Packet()
  packet.from(buffer)

  onClearBuffer()

  if (packet.isCorrect()) {
    switch (packet.getCommand()) {
      case CMD_READ: {
        const {cbhchov4} = device

        if (cbhchov4 === undefined) {
          const {path} = device

          const event: CBHCHOV4Event = {
            type: 'SERIAL_NUMBER',
            data: path,
          }

          onEvent(event)
          break
        }

        const {serialNumber} = cbhchov4

        if (serialNumber === null) {
          break
        }

        const hcho = packet.getUInt16Value() / 1000
        const voc = packet.getUInt16Value(2) / 1000
        const temperature = packet.getUInt16Value(4) / 10
        const humidity = packet.getUInt16Value(6) / 10
        const tvoc = packet.getUInt16Value(8) / 1000
        const sensorStatus = packet.getUInt8Value(10)
        const autoCalibrationSwitch = packet.getUInt8Value(11)

        const event: CBHCHOV4Event = {
          type: 'MEASURE',
          data: {
            hcho,
            voc,
            temperature,
            humidity,
            tvoc,
            sensorStatus,
            autoCalibrationSwitch,
          },
        }

        onEvent(event)
        break
      }
      case CMD_AUTO_CALIBRATION: {
        break
      }
      default:
        break
    }
  }
}

export const updateProp: (
  propType: CBHCHOV4PropType,
  obj: CBHCHOV4 | undefined,
  data,
) => CBHCHOV4 = (propType, obj, data) => {
  let result = obj

  if (result === undefined) {
    result = {
      serialNumber: null,
      swVer: 'NONE',
      hcho: null,
      voc: null,
      temperature: null,
      humidity: null,
      tvoc: null,
      sensorStatus: null,
      autoCalibrationSwitch: null,
    }
  }

  switch (propType) {
    case 'SERIAL_NUMBER': {
      result = {
        ...result,
        serialNumber: data as string,
      }
      break
    }
    case 'MEASURE': {
      const measureData = data as MeasureData

      result = {
        ...result,
        ...measureData,
      }
      break
    }
    default:
      break
  }

  return result
}

export const record: (device: Device) => void = (device) => {
  const {cbhchov4} = device

  if (cbhchov4 === undefined || cbhchov4 === null) {
    return
  }

  const {
    serialNumber,
    hcho,
    voc,
    temperature,
    humidity,
    tvoc,
    sensorStatus,
    autoCalibrationSwitch,
  } = cbhchov4

  if (
    serialNumber === undefined ||
    serialNumber === null ||
    hcho === undefined ||
    hcho === null ||
    voc === undefined ||
    voc === null ||
    temperature === undefined ||
    temperature === null ||
    humidity === undefined ||
    humidity === null ||
    tvoc === undefined ||
    tvoc === null ||
    sensorStatus === undefined ||
    sensorStatus === null ||
    autoCalibrationSwitch === undefined ||
    autoCalibrationSwitch === null
  ) {
    return
  }

  const now = moment().format(FORMAT_TIME)

  const lastTime = timeTable[serialNumber]

  if (lastTime === now) {
    return
  }

  timeTable[serialNumber] = now

  const db = DB.getDb()

  db.serialize(() => {
    db.run(QUERY_CREATE_TABLE)
    db.run(QUERY_INSERT_INTO, [
      serialNumber,
      now,
      hcho,
      voc,
      temperature,
      humidity,
      tvoc,
      sensorStatus,
      autoCalibrationSwitch,
    ])
  })

  db.close()
}

export const getSerialNumbers: (callback: (result: string[]) => void) => void = (callback) => {
  const db = DB.getDb()

  const result: string[] = []

  db.each(
    QUERY_GET_SERIAL_NUMBERS,
    (err, row) => {
      if (err !== undefined && err !== null) {
        return
      }

      const {SERIAL_NUMBER} = row

      result.push(SERIAL_NUMBER)
    },
    (err) => {
      if (err !== undefined && err !== null) {
        console.log('getSerialNumbers failed', err)
      }

      callback(result)
    },
  )

  db.close()
}

export const getData: (serialNumber: string, callback: (result: any[]) => void) => void = (
  serialNumber,
  callback,
) => {
  const db = DB.getDb()

  const result: any[] = []

  db.each(
    QUERY_GET_DATA(serialNumber),
    (err, row) => {
      if (err !== undefined && err !== null) {
        return
      }

      const data = row as Data

      const {
        ID,
        TIMESTAMP,
        HCHO,
        VOC,
        TEMPERATURE,
        HUMIDITY,
        TVOC,
        SENSOR_STATUS,
        AUTO_CALIBRATION_SWITCH,
      } = data

      result.push([
        ID,
        TIMESTAMP,
        HCHO,
        VOC,
        TEMPERATURE,
        HUMIDITY,
        TVOC,
        SENSOR_STATUS,
        AUTO_CALIBRATION_SWITCH,
      ])
    },
    (err) => {
      if (err !== undefined && err !== null) {
        console.log('getData failed', err)
      }

      callback(result)
    },
  )

  db.close()
}
