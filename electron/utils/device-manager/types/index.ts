export type EventType = 'LIST' | 'ADD' | 'REMOVE' | 'PLAY' | 'STOP' | 'APP_PATH'

export interface Event {
  type: EventType
  data?
}

export type DeviceModel = 'PM2008' | 'CM1106' | 'AM1008W-K' | 'CM1107'
