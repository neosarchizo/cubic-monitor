export type AM1002PropType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export type AM1002EventType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export interface AM1002Event {
  type: AM1002EventType
  data
}

export interface AM1002 {
  serialNumber: string | null
  swVer: string | null
  tvoc: number | null
  pm1p0Grimm: number | null
  pm2p5Grimm: number | null
  pm10pGrimm: number | null
  temperature: number | null
  humidity: number | null
}

export interface MeasureData {
  tvoc: number
  pm1p0Grimm: number
  pm2p5Grimm: number
  pm10pGrimm: number
  temperature: number
  humidity: number
}

export interface Data {
  ID: number
  SERIAL_NUMBER: string
  TIMESTAMP: string
  TVOC: number
  PM_1P0: number
  PM_2P5: number
  PM_10P: number
  TEMPERATURE: number
  HUMIDITY: number
}
