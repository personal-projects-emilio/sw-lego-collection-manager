import { TextField } from '@mui/material'

import { Option } from 'types/common'
import { TextfieldFilterConfig } from 'types/filters'

export const chipLabelDefault = (option?: Option) => option?.label

type MakeTextfieldProps = Omit<
  TextfieldFilterConfig,
  'component' | 'inputType' | 'chipLabel' | 'getValues' | 'displayChip' | 'options' | 'defaultValue'
>

export const makeTextfield = ({ label, ...rest }: MakeTextfieldProps): TextfieldFilterConfig => {
  return {
    ...rest,
    chipLabel: chipLabelDefault,
    component: ({ option, onChange }) => {
      return (
        <TextField
          fullWidth
          value={option?.value ?? ''}
          label={label}
          onChange={(e) => onChange({ label: e.target.value, value: String(e.target.value) })}
        />
      )
    },
    getValues: (option) => option.value,
    displayChip: (option) => Boolean(option),
    inputType: 'textfield',
    label,
  }
}
