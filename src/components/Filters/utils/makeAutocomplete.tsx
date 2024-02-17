import { Autocomplete } from 'components/inputs/Autocomplete'
import { Option } from 'types/common'
import { AutocompleteFilterConfig } from 'types/filters'

export const chipLabelDefault = (option?: Option) => option?.label

type MakeAutocompleteProps = Omit<
  AutocompleteFilterConfig,
  'component' | 'inputType' | 'chipLabel' | 'getValues' | 'displayChip'
>

export const makeAutocomplete = ({
  options,
  label,
  defaultValue,
  ...rest
}: MakeAutocompleteProps): AutocompleteFilterConfig => {
  return {
    ...rest,
    chipLabel: chipLabelDefault,
    component: ({ option, onChange }) => {
      return (
        <Autocomplete
          fullWidth
          value={option?.value ?? defaultValue?.value ?? ''}
          options={options}
          label={label}
          onChange={(v) => {
            const selectedOption = options.find((el) => el.value === (v as unknown as string))
            if (!selectedOption) return
            onChange(selectedOption)
          }}
        />
      )
    },
    defaultValue,
    getValues: (option) => option.value,
    displayChip: (option) => Boolean(option),
    inputType: 'autocomplete',
    label,
    options,
  }
}
