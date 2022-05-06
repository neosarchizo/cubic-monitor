export type Language = {
  usb: string
  table: string
  chart: string
  port: string
  refresh: string
  ok: string
  cancel: string
  path: string
  model: string
  pm2008: string
  cm1106: string
  am1008wk: string
  cm1107: string
  connected: string
  recording: string
  serialNumber: string
  swVersion: string
  cubic: string
  devices: string
  none: string
  createdAt: string
  co2: string
  voc: string
  relatedHumidity: string
  temperature: string
  pm1P0Grimm: string
  pm2P5Grimm: string
  pm10PGrimm: string
  vocNowRef: string
  vocRefRValue: string
  vocNowRValue: string
  pmSensorState: string
  pm1P0Tsi: string
  pm2P5Tsi: string
  pm10PTsi: string
  particleNumber0p3UmAbove: string
  particleNumber0p5UmAbove: string
  particleNumber1p0UmAbove: string
  particleNumber2p5UmAbove: string
  particleNumber5p0UmAbove: string
  particleNumber10pUmAbove: string
  refreshInterval: string
  seconds: string
  minute: string
  export: string
  noData: string
  exporting: string
  exportingResult: string
}

export type Translation = {
  translation: Language
}

export type Strings = {
  ko: Translation
}
