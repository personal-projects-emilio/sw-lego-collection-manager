import { LabelAndAmout, Option } from 'types/common'

import { objectKeys } from './typescript'

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

export const searchInObject = (object: object, search: string) => {
  let found = false
  objectKeys(object).forEach((key) => {
    const currentValue = object[key]
    if (typeof currentValue === 'object') {
      searchInObject(currentValue, search)
    }
    if (typeof currentValue === 'string' || typeof currentValue === 'number') {
      const searchRegex = new RegExp(search, 'gi')
      found = searchRegex.test(String(currentValue))
    }
  })
  return found
}
