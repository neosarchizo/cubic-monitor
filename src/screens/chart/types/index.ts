export type ChartType = 'bar' | 'scatter'

export type Visible = 'True' | 'legendonly'

export interface Trace {
  x: string[]
  y: number[]
  type: ChartType
  name: string
  visible: Visible
}
