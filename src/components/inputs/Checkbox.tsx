import { forwardRef } from 'react'
import { Checkbox as MuiCheckbox, FormControlLabel, FormControlLabelProps } from '@mui/material'

export type CustomCheckboxProps<V extends unknown | boolean | null = unknown> = Omit<
  FormControlLabelProps,
  'onChange' | 'control'
> & {
  label: string
  value: V
  isIndeterminate?: boolean
  onChange: (value: V) => void
}

export const Checkbox = forwardRef<HTMLButtonElement, CustomCheckboxProps>(
  ({ value, isIndeterminate = false, label, onChange, ...props }, ref) => {
    const checkboxElement = (
      <MuiCheckbox
        ref={ref}
        checked={Boolean(value)}
        value={Boolean(value)}
        indeterminate={!isIndeterminate ? undefined : value === null}
        color="primary"
        onChange={(_, checked) => {
          if (!isIndeterminate) return onChange(checked)
          if (checked === true && value === false) {
            return onChange(null)
          }
          return onChange(checked)
        }}
      />
    )
    if (label) return <FormControlLabel {...props} control={checkboxElement} label={label} />
    return checkboxElement
  }
)
Checkbox.displayName = 'CustomCheckbox'

export default Checkbox
