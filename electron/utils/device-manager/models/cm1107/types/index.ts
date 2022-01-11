export type CM1107PropType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export type CM1107EventType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export interface CM1107Event {
  type: CM1107EventType
  data
}

export interface CM1107 {
  serialNumber: string | null
  swVer: string | null
  co2: number | null
}

export interface MeasureData {
  co2: number
}
