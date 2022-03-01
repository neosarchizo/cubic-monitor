export type EventType = 'IS_TABLE_EXISTED' | 'GET_SERIAL_NUMBERS' | 'GET_DATA'

export interface Event {
  type: EventType
  data?
}

export type AppEventType = 'IS_TABLE_EXISTED' | 'GET_SERIAL_NUMBERS' | 'GET_DATA'

export interface AppEvent {
  type: AppEventType
  data?
}
