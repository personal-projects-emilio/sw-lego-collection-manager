import { LabelAndAmout, Option } from 'types/common'

export const formatOptionsFromLabelAndAmout = (
  list?: LabelAndAmout[],
  withAmount = false
): Option<string>[] | undefined =>
  list
    ?.map((el) => ({
      label: `${el.label}${withAmount ? ` (${el.amount})` : ''}`,
      value: el.label,
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
