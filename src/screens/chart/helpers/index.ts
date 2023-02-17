import {Trace} from '../types'

export const getTrace: (x: string[], y: number[], name: string, hidden?: boolean) => Trace = (
  x,
  y,
  name,
  hidden,
) => {
  return {
    x,
    y,
    type: 'scatter',
    name,
    visible: hidden ? 'legendonly' : 'True',
  }
}

export const Dummy = ''
