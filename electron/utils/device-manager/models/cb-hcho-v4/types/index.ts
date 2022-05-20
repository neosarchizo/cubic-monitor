export type OpenCloseParticleType = 1 | 2

export type CBHCHOV4PropType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export type CBHCHOV4EventType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export interface CBHCHOV4Event {
  type: CBHCHOV4EventType
  data
}

export interface CBHCHOV4 {
  serialNumber: string | null
  swVer: string | null
  hcho: number | null
  voc: number | null
  temperature: number | null
  humidity: number | null
  tvoc: number | null
  sensorStatus: number | null
  autoCalibrationSwitch: number | null
}

export interface MeasureData {
  hcho: number
  voc: number
  temperature: number
  humidity: number
  tvoc: number
  sensorStatus: number
  autoCalibrationSwitch: number
}

export interface Data {
  ID: number
  SERIAL_NUMBER: string
  TIMESTAMP: string
  HCHO: number
  VOC: number
  TEMPERATURE: number
  HUMIDITY: number
  TVOC: number
  SENSOR_STATUS: number
  AUTO_CALIBRATION_SWITCH: number
}
