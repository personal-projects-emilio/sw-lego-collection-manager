import { Set } from 'types/sets'

import { SetFormModalProps } from './SetFormModal'

export const defaultSetFormValues = (editionSetData: SetFormModalProps['editionSetData']): Set => ({
  id: '',
  appearances: [],
  location: '',
  name: '',
  note: '',
  ownedQuantity: 0,
  releaseYear: new Date().getFullYear(),
  subtheme: '',
  tags: [],
  timelines: [],
  possessed: false,
  ...editionSetData,
  content: {
    bags: null,
    box: null,
    minifigs: [],
    notice: null,
    partsQuantity: null,
    ...editionSetData?.content,
  },
  prices: {
    bought: 0,
    marketValue: 0,
    storeValue: 0,
    ...editionSetData?.prices,
  },
})
