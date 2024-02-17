import { LabelAndAmout } from 'types/common'

export const reduceInArrayOfNElements = <T>(array: T[], numberOfElements: number): T[][] =>
  array.reduce(
    (acc, cur) => {
      const lastElement = acc[acc.length - 1]
      if (lastElement.length < numberOfElements) {
        acc.splice(acc.length - 1, 1, [...lastElement, cur])
        return acc
      } else {
        return [...acc, [cur]]
      }
    },
    [[]] as T[][]
  )

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
export const getEntries = <T extends object>(obj: T) => Object.entries(obj) as Entries<T>

const statisticAccumulator = (acc: LabelAndAmout[], label: string) => {
  const existingIndex = acc.findIndex((el) => el.label === label)
  // If it is a new elemnt we had it to the accumulator
  if (existingIndex === -1) {
    acc.push({ label, amount: 1 })
  } else {
    // Or else we increment the amount of the existing one
    acc[existingIndex].amount++
  }
}

export const statisticsHelper = (
  element: string | string[] | undefined,
  accumulator: LabelAndAmout[]
) => {
  if (!element) return accumulator

  if (typeof element === 'string') {
    statisticAccumulator(accumulator, element)
    return accumulator
  }

  element.forEach((label) => {
    statisticAccumulator(accumulator, label)
  })
  return accumulator
}
