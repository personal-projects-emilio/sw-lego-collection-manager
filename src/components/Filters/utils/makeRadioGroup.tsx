import { RadioGroup } from 'components/inputs'
import { Option } from 'types/common'
import { RadioFilterConfig } from 'types/filters'

export const chipLabelDefault = (option?: Option) => option?.label

type MakeRadioGroupProps = Omit<
  RadioFilterConfig,
  'component' | 'inputType' | 'chipLabel' | 'getValues' | 'displayChip'
>

export const makeRadioGroup = ({
  options,
  label,
  defaultValue,
  ...rest
}: MakeRadioGroupProps): RadioFilterConfig => {
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
        <RadioGroup
          value={option?.value ?? defaultValue?.value ?? ''}
          options={options}
          label={label}
          onChange={changeHandler}
        />
      )
    },
    defaultValue,
    getValues: (option) => option.value,
    displayChip: (option) => Boolean(option),
    inputType: 'radio',
    label,
    options,
  }
}
