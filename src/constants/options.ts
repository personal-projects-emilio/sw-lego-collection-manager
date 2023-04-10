import { Option } from 'types/common'
import { Display } from 'types/filters'

export const displayOptions: Option<Display>[] = [
  { label: 'All', value: 'all' },
  { label: 'Owned', value: 'owned' },
  { label: 'Missing', value: 'missing' },
]
