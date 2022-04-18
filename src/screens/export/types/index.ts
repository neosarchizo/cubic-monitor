import moment from 'moment'

export type RangeType = 'STARTED_AT' | 'ENDED_AT'

export interface Range {
  endedAt: moment.Moment
  startedAt: moment.Moment
  count: number
}
