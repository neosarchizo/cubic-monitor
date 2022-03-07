import {DeviceModel} from '../../../contexts/device/types'

export interface ModelOption {
  id: DeviceModel
  name: string
}

export interface Props {
  onChange: (value: DeviceModel) => void
  value: string
  ref?
}
