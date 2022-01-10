export type EventType = 'LIST' | 'ADD'

export interface Event {
  type: EventType
  data?
}
