export type ChartType = 'bar' | 'scatter'

export type Visible = 'True' | 'legendonly'

export interface Trace {
  x: string[]
  y: number[]
  type: ChartType
  name: string
  visible: Visible
}

export interface Layout {
  title?: string
  datarevision?: string
}

export interface PM2008LegendState {
  pm1P0Grimm: boolean
  pm2P5Grimm: boolean
  pm10PGrimm: boolean
  pm1P0Tsi: boolean
  pm2P5Tsi: boolean
  pm10PTsi: boolean
  particleNumber0p3UmAbove: boolean
  particleNumber0p5UmAbove: boolean
  particleNumber1p0UmAbove: boolean
  particleNumber2p5UmAbove: boolean
  particleNumber5p0UmAbove: boolean
  particleNumber10pUmAbove: boolean
}

export interface CM1106LegendState {
  co2: boolean
}

export interface CM1107LegendState {
  co2: boolean
}

export interface AM1008WKLegendState {
  co2: boolean
  voc: boolean
  relatedHumidity: boolean
  temperature: boolean
  pm1P0Grimm: boolean
  pm2P5Grimm: boolean
  pm10PGrimm: boolean
  vocNowRef: boolean
  vocRefRValue: boolean
  vocNowRValue: boolean
  pmSensorState: boolean
}

export interface CBHCHOV4LegendState {
  hcho: boolean
  voc: boolean
  temperature: boolean
  humidity: boolean
  tvoc: boolean
  sensorStatus: boolean
  autoCalibrationSwitch: boolean
}

export interface AM1002LegendState {
  tvoc: boolean
  pm1p0Grimm: boolean
  pm2p5Grimm: boolean
  pm10pGrimm: boolean
  temperature: boolean
  humidity: boolean
}
