import {DeviceModel} from '../../../contexts/device/types'

export interface ModelOption {
  id: string
  name: string
}

export interface Props {
  model: DeviceModel
  onChange: (value: string) => void
  value: string
  ref?
}
