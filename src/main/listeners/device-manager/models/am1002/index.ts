import numeral from 'numeral'
import moment from 'moment'

import {DFC, DPFC, Device} from '../../types'
import Packet from '../../../../utils/packet'
import {
  CMD_READ_MEASUREMENT_RESULT,
  CMD_READ_SOFTWARE_VERSION_NUMBER,
  CMD_READ_SERIAL_NUMBER,
} from './constants'
import {FRAME_SEND_STX, FRAME_RESP_STX} from '../../../../utils/packet/constants'
import {AM1002Event, AM1002PropType, AM1002, MeasureData, Data} from './types'
import * as DB from '../../../../utils/db-manager'
import {FORMAT_TIME} from '../constants'
import {
  QUERY_CREATE_TABLE,
  QUERY_INSERT_INTO,
  QUERY_GET_SERIAL_NUMBERS,
  QUERY_GET_DATA,
} from './queries'

const timeTable: {[sn: string]: string} = {}

export const readMeasurementResult: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_READ_MEASUREMENT_RESULT)

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

        const event: AM1002Event = {
          type: 'SERIAL_NUMBER',
          data: serialNumber,
        }

        onEvent(event)
        break
      }
      case CMD_READ_SOFTWARE_VERSION_NUMBER: {
        const swVer = packet.getAsciiValue()

        const event: AM1002Event = {
          type: 'SW_VER',
          data: swVer,
        }

        onEvent(event)
        break
      }
      case CMD_READ_MEASUREMENT_RESULT: {
        console.log('CMD_READ_MEASUREMENT_RESULT!!!')

        const {am1002} = device

        if (am1002 === undefined) {
          break
        }

        const {serialNumber} = am1002

        if (serialNumber === null) {
          break
        }

        const tvoc = packet.getUInt16Value()
        const pm1p0Grimm = packet.getUInt16Value(4)
        const pm2p5Grimm = packet.getUInt16Value(6)
        const pm10pGrimm = packet.getUInt16Value(8)
        const temperature = (packet.getUInt16Value(10) - 500) / 10
        const humidity = packet.getUInt16Value(12) / 10

        const event: AM1002Event = {
          type: 'MEASURE',
          data: {
            tvoc,
            pm1p0Grimm,
            pm2p5Grimm,
            pm10pGrimm,
            temperature,
            humidity,
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

export const updateProp: (propType: AM1002PropType, obj: AM1002 | undefined, data) => AM1002 = (
  propType,
  obj,
  data,
) => {
  let result = obj

  if (result === undefined) {
    result = {
      serialNumber: null,
      swVer: null,
      tvoc: null,
      pm1p0Grimm: null,
      pm2p5Grimm: null,
      pm10pGrimm: null,
      temperature: null,
      humidity: null,
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
  const {am1002} = device

  if (am1002 === undefined || am1002 === null) {
    return
  }

  const {serialNumber, tvoc, pm1p0Grimm, pm2p5Grimm, pm10pGrimm, temperature, humidity} = am1002

  if (
    serialNumber === undefined ||
    serialNumber === null ||
    tvoc === undefined ||
    tvoc === null ||
    pm1p0Grimm === undefined ||
    pm1p0Grimm === null ||
    pm2p5Grimm === undefined ||
    pm2p5Grimm === null ||
    pm10pGrimm === undefined ||
    pm10pGrimm === null ||
    temperature === undefined ||
    temperature === null ||
    humidity === undefined ||
    humidity === null
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
      tvoc,
      pm1p0Grimm,
      pm2p5Grimm,
      pm10pGrimm,
      temperature,
      humidity,
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

      const data = row as Data

      const {SERIAL_NUMBER} = data

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

      const {ID, TIMESTAMP, TVOC, PM_1P0, PM_2P5, PM_10P, TEMPERATURE, HUMIDITY} = data

      result.push([ID, TIMESTAMP, TVOC, PM_1P0, PM_2P5, PM_10P, TEMPERATURE, HUMIDITY])
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
