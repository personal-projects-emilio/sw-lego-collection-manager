import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from '@mui/material'

import { Option } from 'types/common'

export interface RadioGroupProps<V extends string = string> {
  label: string
  options: Option<V>[]
  value: V
  onChange: (value: V) => void
}

export function RadioGroup<V extends string = string>({
  options,
  label,
  value,
  onChange,
}: RadioGroupProps<V>) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <MuiRadioGroup
        aria-label={label}
        name={label}
        value={value}
        onChange={(_, v) => onChange(v as V)}
      >
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <FormControlLabel
            key={`${optionValue}-${optionLabel}`}
            value={optionValue}
            control={<Radio />}
            label={optionLabel}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  )
}

export default RadioGroup
