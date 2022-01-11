export type CM1106PropType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export type CM1106EventType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export interface CM1106Event {
  type: CM1106EventType
  data
}

export interface CM1106 {
  serialNumber: string | null
  swVer: string | null
  co2: number | null
}

export interface MeasureData {
  co2: number
}
