/* eslint-disable no-bitwise */
import SerialPort = require('serialport')
import numeral = require('numeral')
import moment = require('moment')

import {DFC, DPFC, Device} from '../../types'
import Packet from '../../../../utils/packet'
import {
  CMD_READ_MEASUREMENT_RESULT,
  CMD_CO_2_CALIBRATION,
  CMD_OPEN_CLOSE_PARTICLE_MEASUREMENT,
  CMD_SET_UP_AND_READ_PARTICLE_MEASUREMENT_TIME,
  CMD_SET_UP_AND_READ_TIMING_MEASUREMENT_MODE,
  CMD_SET_UP_AND_READ_DYNAMIC_WORKING_MODE,
  CMD_SET_UP_AND_READ_PARTICLE_CALIBRATED_COEFFICIENT,
  CMD_OPEN_CLOSE_LASER_DIODE,
  CMD_READ_SOFTWARE_VERSION,
  CMD_READ_SERIAL_NUMBER,
} from './constants'
import {FRAME_SEND_STX, FRAME_RESP_STX} from '../../../../utils/packet/constants'
import {
  AM1008WKEvent,
  AM1008WKPropType,
  AM1008WK,
  MeasureData,
  OpenCloseParticleType,
  Data,
} from './types'
import * as DB from '../../../../utils/db-manager'
import {FORMAT_TIME} from '../constants'
import {
  QUERY_CREATE_TABLE,
  QUERY_INSERT_INTO,
  QUERY_GET_SERIAL_NUMBERS,
  QUERY_GET_DATA,
} from './queries'

const timeTable: {[sn: string]: string} = {}

export const readMeasuredResult: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_READ_MEASUREMENT_RESULT, [0x01])

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const co2Calibration: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_CO_2_CALIBRATION)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const openCloseParticleMeasurement: (
  port: SerialPort,
  openCloseParticleType: OpenCloseParticleType,
) => void = (port, openCloseParticleType) => {
  const packet = new Packet()
  packet.generate(CMD_OPEN_CLOSE_PARTICLE_MEASUREMENT, [openCloseParticleType, 0x1e])

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const setUpAndReadParticleMeasurementTime: (port: SerialPort, sec: number) => void = (
  port,
  sec,
) => {
  const packet = new Packet()
  packet.generate(CMD_SET_UP_AND_READ_PARTICLE_MEASUREMENT_TIME, [(sec >> 8) & 0xff, sec & 0xff])

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const setUpAndReadTimingMeasurementMode: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_SET_UP_AND_READ_TIMING_MEASUREMENT_MODE)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const setUpAndReadDynamicWorkingMode: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_SET_UP_AND_READ_DYNAMIC_WORKING_MODE)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const setUpAndReadParticleCalibratedCoefficient: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_SET_UP_AND_READ_PARTICLE_CALIBRATED_COEFFICIENT)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const openCloseLaserDiode: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_OPEN_CLOSE_LASER_DIODE)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const readSoftwareVersionNumber: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_READ_SOFTWARE_VERSION)

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const readSerialNumber: DFC = (port) => {
  console.log('AM1008W-K::readSerialNumber')
  const packet = new Packet()
  packet.generate(CMD_READ_SERIAL_NUMBER)

  console.log('here!!', packet.getBuffer())

  port.write(packet.getBuffer(), (e) => {
    if (e) {
      console.log('write err', e)
    }
  })
}

export const parse: DPFC = (device, buffer, onClearBuffer, onEvent) => {
  console.log('AM1008W-K::parse', buffer)

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

        const event: AM1008WKEvent = {
          type: 'SERIAL_NUMBER',
          data: serialNumber,
        }

        onEvent(event)
        break
      }
      case CMD_READ_SOFTWARE_VERSION: {
        const swVer = packet.getAsciiValue()

        const event: AM1008WKEvent = {
          type: 'SW_VER',
          data: swVer,
        }

        onEvent(event)
        break
      }
      case CMD_READ_MEASUREMENT_RESULT: {
        console.log('CMD_READ_MEASUREMENT_RESULT!!!')

        const {am1008wk} = device

        if (am1008wk === undefined) {
          break
        }

        const {serialNumber} = am1008wk

        if (serialNumber === null) {
          break
        }

        const co2 = packet.getUInt16Value()
        const voc = packet.getUInt16Value(2)
        const relatedHumidity = packet.getUInt16Value(4) / 10
        const temperature = (packet.getUInt16Value(6) - 500) / 10
        const pm1p0Grimm = packet.getUInt16Value(8)
        const pm2p5Grimm = packet.getUInt16Value(10)
        const pm10pGrimm = packet.getUInt16Value(12)
        const vocNowRef = packet.getUInt16Value(14)
        const vocRefRValue = packet.getUInt16Value(16) * 10
        const vocNowRValue = packet.getUInt16Value(18) * 10
        const pmSensorState = packet.getUInt16Value(20)

        const event: AM1008WKEvent = {
          type: 'MEASURE',
          data: {
            co2,
            voc,
            relatedHumidity,
            temperature,
            pm1p0Grimm,
            pm2p5Grimm,
            pm10pGrimm,
            vocNowRef,
            vocRefRValue,
            vocNowRValue,
            pmSensorState,
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

export const updateProp: (
  propType: AM1008WKPropType,
  obj: AM1008WK | undefined,
  data,
) => AM1008WK = (propType, obj, data) => {
  let result = obj

  if (result === undefined) {
    result = {
      serialNumber: null,
      swVer: null,
      co2: null,
      voc: null,
      relatedHumidity: null,
      temperature: null,
      pm1p0Grimm: null,
      pm2p5Grimm: null,
      pm10pGrimm: null,
      vocNowRef: null,
      vocRefRValue: null,
      vocNowRValue: null,
      pmSensorState: null,
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
  const {am1008wk} = device

  if (am1008wk === undefined || am1008wk === null) {
    return
  }

  const {
    serialNumber,
    co2,
    voc,
    relatedHumidity,
    temperature,
    pm1p0Grimm,
    pm2p5Grimm,
    pm10pGrimm,
    vocNowRef,
    vocRefRValue,
    vocNowRValue,
    pmSensorState,
  } = am1008wk

  if (
    serialNumber === undefined ||
    serialNumber === null ||
    co2 === undefined ||
    co2 === null ||
    voc === undefined ||
    voc === null ||
    relatedHumidity === undefined ||
    relatedHumidity === null ||
    temperature === undefined ||
    temperature === null ||
    pm1p0Grimm === undefined ||
    pm1p0Grimm === null ||
    pm2p5Grimm === undefined ||
    pm2p5Grimm === null ||
    pm10pGrimm === undefined ||
    pm10pGrimm === null ||
    vocNowRef === undefined ||
    vocNowRef === null ||
    vocRefRValue === undefined ||
    vocRefRValue === null ||
    vocNowRValue === undefined ||
    vocNowRValue === null ||
    pmSensorState === undefined ||
    pmSensorState === null
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
      co2,
      voc,
      relatedHumidity,
      temperature,
      pm1p0Grimm,
      pm2p5Grimm,
      pm10pGrimm,
      vocNowRef,
      vocRefRValue,
      vocNowRValue,
      pmSensorState,
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
        CO2,
        VOC,
        RELATED_HUMIDITY,
        TEMPERATURE,
        PM_1P0_GRIMM,
        PM_2P5_GRIMM,
        PM_10P_GRIMM,
        VOC_NOW_REF,
        VOC_REF_R_VALUE,
        VOC_NOW_R_VALUE,
        PM_SENSOR_STATE,
      } = data

      result.push([
        ID,
        TIMESTAMP,
        CO2,
        VOC,
        RELATED_HUMIDITY,
        TEMPERATURE,
        PM_1P0_GRIMM,
        PM_2P5_GRIMM,
        PM_10P_GRIMM,
        VOC_NOW_REF,
        VOC_REF_R_VALUE,
        VOC_NOW_R_VALUE,
        PM_SENSOR_STATE,
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
