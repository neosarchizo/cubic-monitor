export type OpenCloseParticleType = 1 | 2

export type AM1008WKPropType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export type AM1008WKEventType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export interface AM1008WKEvent {
  type: AM1008WKEventType
  data
}

export interface AM1008WK {
  serialNumber: string | null
  swVer: string | null
  co2: number | null
  voc: number | null
  relatedHumidity: number | null
  temperature: number | null
  pm1p0Grimm: number | null
  pm2p5Grimm: number | null
  pm10pGrimm: number | null
  vocNowRef: number | null
  vocRefRValue: number | null
  vocNowRValue: number | null
  pmSensorState: number | null
}

export interface MeasureData {
  co2: number
  voc: number
  relatedHumidity: number
  temperature: number
  pm1p0Grimm: number
  pm2p5Grimm: number
  pm10pGrimm: number
  vocNowRef: number
  vocRefRValue: number
  vocNowRValue: number
  pmSensorState: number
}
