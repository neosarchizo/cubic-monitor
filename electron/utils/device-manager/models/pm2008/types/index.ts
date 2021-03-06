export type OpenCloseParticleType = 1 | 2

export type PM2008PropType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export interface PM2008 {
  serialNumber: string | null
  swVer: string | null
  pm1p0Grimm: number | null
  pm2p5Grimm: number | null
  pm10pGrimm: number | null
  pm1p0Tsi: number | null
  pm2p5Tsi: number | null
  pm10pTsi: number | null
  particleNumber0p3UmAbove: number | null
  particleNumber0p5UmAbove: number | null
  particleNumber1p0UmAbove: number | null
  particleNumber2p5UmAbove: number | null
  particleNumber5p0UmAbove: number | null
  particleNumber10pUmAbove: number | null
}

export type PM2008EventType = 'SERIAL_NUMBER' | 'SW_VER' | 'MEASURE'

export interface PM2008Event {
  type: PM2008EventType
  data
}

export interface MeasureData {
  pm1p0Grimm: number
  pm2p5Grimm: number
  pm10pGrimm: number
  pm1p0Tsi: number
  pm2p5Tsi: number
  pm10pTsi: number
  particleNumber0p3UmAbove: number
  particleNumber0p5UmAbove: number
  particleNumber1p0UmAbove: number
  particleNumber2p5UmAbove: number
  particleNumber5p0UmAbove: number
  particleNumber10pUmAbove: number
}

export interface Data {
  ID: number
  SERIAL_NUMBER: string
  TIMESTAMP: string
  PM_1P0_GRIMM: number
  PM_2P5_GRIMM: number
  PM_10P_GRIMM: number
  PM_1P0_TSI: number
  PM_2P5_TSI: number
  PM_10P_TSI: number
  PN_0P3: number
  PN_0P5: number
  PN_1P0: number
  PN_2P5: number
  PN_5P0: number
  PN_10P: number
}
