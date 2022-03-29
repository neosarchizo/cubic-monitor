import {Trace} from '../types'

export const getTrace: (x: string[], y: number[], name: string) => Trace = (x, y, name) => {
  return {
    x,
    y,
    type: 'scatter',
    name,
    visible: 'True',
  }
}

export const Dummy = ''
