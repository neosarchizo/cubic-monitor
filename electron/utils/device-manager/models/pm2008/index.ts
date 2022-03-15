/* eslint-disable no-bitwise */
import SerialPort = require('serialport')
import numeral = require('numeral')
import moment = require('moment')

import {DFC, DPFC, Device} from '../../types'
import Packet from '../../../packet'
import {
  CMD_SET_UP_AND_READ_TIMING_MEASUREMENT_MODE,
  CMD_SET_UP_AND_READ_DYNAMIC_WORKING_MODE,
  CMD_SET_UP_AND_READ_PARTICLE_CALIBRATED_COEFFICIENT,
  CMD_CLOSE_OPEN_LASER_DIODE,
  CMD_READ_PARTICLE_MEASUREMENT_RESULT,
  CMD_OPEN_CLOSE_PARTICLE_MEASUREMENT,
  CMD_SET_UP_AND_READ_PARTICLE_MEASUREMENT_TIME,
  CMD_READ_SOFTWARE_VERSION_NUMBER,
  CMD_READ_SERIAL_NUMBER,
} from './constants'
import {
  OpenCloseParticleType,
  PM2008,
  PM2008Event,
  PM2008PropType,
  MeasureData,
  Data,
} from './types'
import {FRAME_SEND_STX, FRAME_RESP_STX} from '../../../packet/constants'
import * as DB from '../../../db-manager'
import {
  QUERY_CREATE_TABLE,
  QUERY_INSERT_INTO,
  QUERY_GET_SERIAL_NUMBERS,
  QUERY_GET_DATA,
} from './queries'
import {FORMAT_TIME} from '../constants'

const timeTable: {[sn: string]: string} = {}

export const readParticleMeasurementResult: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_READ_PARTICLE_MEASUREMENT_RESULT, [0x07])

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

export const closeOpenLaserDiode: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_CLOSE_OPEN_LASER_DIODE)

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

export const readSerialNumber: DFC = (port) => {
  const packet = new Packet()
  packet.generate(CMD_READ_SERIAL_NUMBER)

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

        const event: PM2008Event = {
          type: 'SERIAL_NUMBER',
          data: serialNumber,
        }

        onEvent(event)
        break
      }
      case CMD_READ_SOFTWARE_VERSION_NUMBER: {
        const swVer = packet.getAsciiValue()

        const event: PM2008Event = {
          type: 'SW_VER',
          data: swVer,
        }

        onEvent(event)
        break
      }
      case CMD_READ_PARTICLE_MEASUREMENT_RESULT: {
        console.log('CMD_READ_PARTICLE_MEASUREMENT_RESULT!!!')

        const {pm2008} = device

        if (pm2008 === undefined) {
          break
        }

        const {serialNumber} = pm2008

        if (serialNumber === null) {
          break
        }

        const pm1p0Grimm = packet.getUInt32Value()
        const pm2p5Grimm = packet.getUInt32Value(4)
        const pm10pGrimm = packet.getUInt32Value(8)
        const pm1p0Tsi = packet.getUInt32Value(12)
        const pm2p5Tsi = packet.getUInt32Value(16)
        const pm10pTsi = packet.getUInt32Value(20)
        const particleNumber0p3UmAbove = packet.getUInt32Value(24)
        const particleNumber0p5UmAbove = packet.getUInt32Value(28)
        const particleNumber1p0UmAbove = packet.getUInt32Value(32)
        const particleNumber2p5UmAbove = packet.getUInt32Value(36)
        const particleNumber5p0UmAbove = packet.getUInt32Value(40)
        const particleNumber10pUmAbove = packet.getUInt32Value(44)

        const event: PM2008Event = {
          type: 'MEASURE',
          data: {
            pm1p0Grimm,
            pm2p5Grimm,
            pm10pGrimm,
            pm1p0Tsi,
            pm2p5Tsi,
            pm10pTsi,
            particleNumber0p3UmAbove,
            particleNumber0p5UmAbove,
            particleNumber1p0UmAbove,
            particleNumber2p5UmAbove,
            particleNumber5p0UmAbove,
            particleNumber10pUmAbove,
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

export const updateProp: (propType: PM2008PropType, obj: PM2008 | undefined, data) => PM2008 = (
  propType,
  obj,
  data,
) => {
  let result = obj

  if (result === undefined) {
    result = {
      serialNumber: null,
      swVer: null,
      pm1p0Grimm: null,
      pm2p5Grimm: null,
      pm10pGrimm: null,
      pm1p0Tsi: null,
      pm2p5Tsi: null,
      pm10pTsi: null,
      particleNumber0p3UmAbove: null,
      particleNumber0p5UmAbove: null,
      particleNumber1p0UmAbove: null,
      particleNumber2p5UmAbove: null,
      particleNumber5p0UmAbove: null,
      particleNumber10pUmAbove: null,
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
  const {pm2008} = device

  if (pm2008 === undefined || pm2008 === null) {
    return
  }

  const {
    serialNumber,
    pm1p0Grimm,
    pm2p5Grimm,
    pm10pGrimm,
    pm1p0Tsi,
    pm2p5Tsi,
    pm10pTsi,
    particleNumber0p3UmAbove,
    particleNumber0p5UmAbove,
    particleNumber1p0UmAbove,
    particleNumber2p5UmAbove,
    particleNumber5p0UmAbove,
    particleNumber10pUmAbove,
  } = pm2008

  if (
    serialNumber === undefined ||
    serialNumber === null ||
    pm1p0Grimm === undefined ||
    pm1p0Grimm === null ||
    pm2p5Grimm === undefined ||
    pm2p5Grimm === null ||
    pm10pGrimm === undefined ||
    pm10pGrimm === null ||
    pm1p0Tsi === undefined ||
    pm1p0Tsi === null ||
    pm2p5Tsi === undefined ||
    pm2p5Tsi === null ||
    pm10pTsi === undefined ||
    pm10pTsi === null ||
    particleNumber0p3UmAbove === undefined ||
    particleNumber0p3UmAbove === null ||
    particleNumber0p5UmAbove === undefined ||
    particleNumber0p5UmAbove === null ||
    particleNumber1p0UmAbove === undefined ||
    particleNumber1p0UmAbove === null ||
    particleNumber2p5UmAbove === undefined ||
    particleNumber2p5UmAbove === null ||
    particleNumber5p0UmAbove === undefined ||
    particleNumber5p0UmAbove === null ||
    particleNumber10pUmAbove === undefined ||
    particleNumber10pUmAbove === null
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
      pm1p0Grimm,
      pm2p5Grimm,
      pm10pGrimm,
      pm1p0Tsi,
      pm2p5Tsi,
      pm10pTsi,
      particleNumber0p3UmAbove,
      particleNumber0p5UmAbove,
      particleNumber1p0UmAbove,
      particleNumber2p5UmAbove,
      particleNumber5p0UmAbove,
      particleNumber10pUmAbove,
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
        PM_1P0_GRIMM,
        PM_2P5_GRIMM,
        PM_10P_GRIMM,
        PM_1P0_TSI,
        PM_2P5_TSI,
        PM_10P_TSI,
        PN_0P3,
        PN_0P5,
        PN_1P0,
        PN_2P5,
        PN_5P0,
        PN_10P,
      } = data

      result.push([
        ID,
        TIMESTAMP,
        PM_1P0_GRIMM,
        PM_2P5_GRIMM,
        PM_10P_GRIMM,
        PM_1P0_TSI,
        PM_2P5_TSI,
        PM_10P_TSI,
        PN_0P3,
        PN_0P5,
        PN_1P0,
        PN_2P5,
        PN_5P0,
        PN_10P,
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
