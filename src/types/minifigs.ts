import { LabelAndAmout } from './common'

export interface Minifig {
  id: string
  characterName: string
  name: string
  possessed: boolean
  tags?: string[]
}

export type MinifigsList = Minifig[]

export interface MinifigsListStatistics {
  tags: LabelAndAmout[]
  characterNames: LabelAndAmout[]
  totalNumber: number
  numberPossessed: number
  percentageOwned: number
}
