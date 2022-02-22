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
}

export type Translation = {
  translation: Language
}

export type Strings = {
  ko: Translation
}
