import {FC, ChangeEvent, useCallback} from 'react'
import {FormControlLabel, Checkbox} from '@mui/material'

import {Props} from './types'

const Main: FC<Props> = (props) => {
  const {name, label, value, onChange} = props

  const handleOnCheckBoxChange = useCallback<(event: ChangeEvent<HTMLInputElement>) => void>(
    (event) => {
      const {
        target: {checked: c},
      } = event

      onChange(c)
    },
    [onChange],
  )

  return (
    <FormControlLabel
      control={
        <Checkbox color="secondary" name={name} checked={value} onChange={handleOnCheckBoxChange} />
      }
      label={label}
    />
  )
}

export default Main
