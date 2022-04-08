import {ResGetRange, DeviceModel} from '../../../contexts/device/types'

export interface Props {
  onRange: (range: ResGetRange) => void
  modelOption: DeviceModel
  serialNumberOption: string

  onModelOptionChange: (mOption: DeviceModel) => void
  onSerialNumberOptionChange: (snOption: string) => void
}
