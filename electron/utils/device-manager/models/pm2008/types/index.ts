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
