import { useId } from 'react'
import { MenuItem, TextField, TextFieldProps } from '@mui/material'

import { Option } from 'types/common'

export type SelectProps<V extends string = string> = Omit<
  TextFieldProps,
  'id' | 'onChange' | 'select' | 'value'
> & {
  options: Option<V>[]
  value: V
  onChange: (value: V) => void
}

export function Select<V extends string = string>({
  options,
  label,
  value,
  onChange,
  ...textFieldProps
}: SelectProps<V>) {
  const id = useId()
  return (
    <TextField
      select
      id={id}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value as V)}
      {...textFieldProps}
    >
      {options.map(({ value: optionValue, label: optionLabel }) => (
        <MenuItem key={`${optionValue}-${optionLabel}`} value={optionValue}>
          {optionLabel}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Select
