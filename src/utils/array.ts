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
