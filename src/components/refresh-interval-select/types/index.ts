import {RefreshIntervalType} from '../../../types'

export interface RefreshIntervalOption {
  id: RefreshIntervalType
  name: string
}

export interface Props {
  value: RefreshIntervalType
  onChange: (value: RefreshIntervalType) => void
  ref?
}
