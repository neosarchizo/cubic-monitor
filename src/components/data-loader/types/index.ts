import {ResGetData, DeviceModel} from '../../../contexts/device/types'

export interface Props {
  onData: (data: ResGetData) => void
  modelOption: DeviceModel
  serialNumberOption: string

  onModelOptionChange: (mOption: DeviceModel) => void
  onSerialNumberOptionChange: (snOption: string) => void
}
