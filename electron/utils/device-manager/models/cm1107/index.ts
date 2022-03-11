import numeral = require('numeral')
import moment = require('moment')

import {DFC, DPFC, Device} from '../../types'
import Packet from '../../../packet'
import {
  CMD_READ_MEASURED_CO2_RESULT,
  CMD_SET_ABC,
  CMD_CALIBRATE_CONCENTRATION_CO2_VALUE,
  CMD_READ_SERIAL_NUMBER,
  CMD_READ_SOFTWARE_VERSION_NUMBER,
} from './constants'
import {FRAME_SEND_STX, FRAME_RESP_STX} from '../../../packet/constants'
import {CM1107Event, CM1107PropType, CM1107, MeasureData, Data} from './types'
import * as DB from '../../../db-manager'
import {FORMAT_TIME} from '../constants'
import {
  QUERY_CREATE_TABLE,
  QUERY_INSERT_INTO,
  QUERY_GET_SERIAL_NUMBERS,
  QUERY_GET_DATA,
} from './queries'

const timeTable: {[sn: string]: string} = {}

export const readMeasuredCo2Result: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_READ_MEASURED_CO2_RESULT)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const setAbc: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_SET_ABC)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const calibrateConcentrationCo2Value: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_CALIBRATE_CONCENTRATION_CO2_VALUE)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const readSerialNumber: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_READ_SERIAL_NUMBER)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const readSoftwareVersionNumber: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_READ_SOFTWARE_VERSION_NUMBER)

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
      case CMD_READ_SERIAL_NUMBER: {
        const sn0 = packet.getUInt16Value()
        const sn1 = packet.getUInt16Value(2)
        const sn2 = packet.getUInt16Value(4)
        const sn3 = packet.getUInt16Value(6)
        const sn4 = packet.getUInt16Value(8)

        const serialNumber = `${numeral(sn0).format('0000')}${numeral(sn1).format('0000')}${numeral(
          sn2,
        ).format('0000')}${numeral(sn3).format('0000')}${numeral(sn4).format('0000')}`

        const event: CM1107Event = {
          type: 'SERIAL_NUMBER',
          data: serialNumber,
        }

        onEvent(event)
        break
      }
      case CMD_READ_SOFTWARE_VERSION_NUMBER: {
        const swVer = packet.getAsciiValue()

        const event: CM1107Event = {
          type: 'SW_VER',
          data: swVer,
        }

        onEvent(event)
        break
      }
      case CMD_READ_MEASURED_CO2_RESULT: {
        console.log('CMD_READ_MEASURED_CO2_RESULT!!!')

        const {cm1107} = device

        if (cm1107 === undefined) {
          break
        }

        const {serialNumber} = cm1107

        if (serialNumber === null) {
          break
        }

        const co2 = packet.getUInt16Value()

        const event: CM1107Event = {
          type: 'MEASURE',
          data: {
            co2,
          },
        }

        onEvent(event)
        break
      }
      default:
        break
    }
  }
}

export const updateProp: (propType: CM1107PropType, obj: CM1107 | undefined, data) => CM1107 = (
  propType,
  obj,
  data,
) => {
  let result = obj

  if (result === undefined) {
    result = {
      serialNumber: null,
      swVer: null,
      co2: null,
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
    case 'SW_VER': {
      result = {
        ...result,
        swVer: data as string,
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
  const {cm1107} = device

  if (cm1107 === undefined || cm1107 === null) {
    return
  }

  const {serialNumber, co2} = cm1107

  if (serialNumber === undefined || serialNumber === null || co2 === undefined || co2 === null) {
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
    db.run(QUERY_INSERT_INTO, [serialNumber, now, co2])
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

  const result: any[] = [['ID', 'TIMESTAMP', 'CO2']]

  db.each(
    QUERY_GET_DATA(serialNumber),
    (err, row) => {
      if (err !== undefined && err !== null) {
        return
      }

      const data = row as Data

      const {ID, TIMESTAMP, CO2} = data

      result.push([ID, TIMESTAMP, CO2])
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
