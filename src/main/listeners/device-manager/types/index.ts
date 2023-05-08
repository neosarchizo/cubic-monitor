export type EventType =
  | 'LIST'
  | 'ADD'
  | 'REMOVE'
  | 'PLAY'
  | 'STOP'
  | 'APP_PATH'
  | 'GET_SERIAL_NUMBERS'
  | 'GET_DATA'
  | 'GET_RANGE'
  | 'GET_COUNT_BY_RANGE'
  | 'EXPORT_XLSX'

export interface Event {
  type: EventType
  data?
}

export type AppEventType =
  | 'LIST'
  | 'DEVICES'
  | 'APP_PATH'
  | 'GET_SERIAL_NUMBERS'
  | 'GET_DATA'
  | 'GET_RANGE'
  | 'GET_COUNT_BY_RANGE'
  | 'EXPORT_XLSX'
