export type EventType =
  | 'IS_TABLE_EXISTED'
  | 'GET_PM2008_DATA'
  | 'GET_CM1106_DATA'
  | 'GET_CM1107_DATA'
  | 'GET_AM1008WK_DATA'

export interface Event {
  type: EventType
  data?
}
