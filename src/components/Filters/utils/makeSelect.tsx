import { Select } from 'components/inputs'
import { Option } from 'types/common'
import { SelectFilterConfig } from 'types/filters'

export const chipLabelDefault = (option?: Option) => option?.label

type MakeSelectProps = Omit<
  SelectFilterConfig,
  'component' | 'inputType' | 'chipLabel' | 'getValues' | 'displayChip'
>

export const makeSelect = ({
  options,
  label,
  defaultValue,
  ...rest
}: MakeSelectProps): SelectFilterConfig => {
  return {
    ...rest,
    chipLabel: chipLabelDefault,
    component: ({ option, onChange }) => {
      const changeHandler = (v: string) => {
        const selectedOption = options.find((el) => el.value === v)
        if (!selectedOption) return
        onChange(selectedOption)
      }
      return (
        <Select
          fullWidth
          value={option?.value ?? defaultValue?.value ?? ''}
          options={options}
          label={label}
          onChange={changeHandler}
          SelectProps={{
            MenuProps: {
              sx: {
                maxHeight: 500,
              },
            },
          }}
        />
      )
    },
    defaultValue,
    getValues: (option) => option.value,
    displayChip: (option) => Boolean(option),
    inputType: 'select',
    label,
    options,
  }
}
