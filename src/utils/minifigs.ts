import { MinifigFiltersContextProps } from 'pages/Minifigs/hooks/useMinifigsFilters'
import { MinifigsList, MinifigsListStatistics } from 'types/minifigs'

/**
 * Return the tags and character names alphabetically sorted lists and some other misce stats from a MinifigsList
 */
export const getMinifigsListStatistics = (minifigsList: MinifigsList) => {
  const minifigsListStatistics = minifigsList.reduce<MinifigsListStatistics>(
    (accumulator, currentMinifig, index) => {
      const { characterName, tags, possessed } = currentMinifig

      const characNameIndex = accumulator.characterNames.findIndex(
        (el) => el.label === characterName
      )
      // If it is a new character name we had it to the accumulator
      if (characNameIndex === -1) {
        accumulator.characterNames.push({ label: characterName, amount: 1 })
      } else {
        // Or else we increment the amount of the existing one
        accumulator.characterNames[characNameIndex].amount++
      }

      if (tags && tags.length) {
        tags.forEach((tag) => {
          const tagIndex = accumulator.tags.findIndex((el) => el.label === tag)
          // If it is a new tag we had it to the accumulator
          if (tagIndex === -1) {
            accumulator.tags.push({ label: tag, amount: 1 })
          } else {
            // Or else we increment the amount of the existing one
            accumulator.tags[tagIndex].amount++
          }
        })
      }

      if (possessed) accumulator.numberPossessed++

      if (index === minifigsList.length - 1) {
        accumulator.totalNumber = minifigsList.length
        accumulator.percentageOwned =
          Math.round((accumulator.numberPossessed / accumulator.totalNumber) * 10000) / 100
      }

      return accumulator
    },
    { tags: [], characterNames: [], totalNumber: 0, numberPossessed: 0, percentageOwned: 0 }
  )
  minifigsListStatistics.tags.sort((a, b) => a.label.localeCompare(b.label))
  minifigsListStatistics.characterNames.sort((a, b) => a.label.localeCompare(b.label))
  return minifigsListStatistics
}

/**
 * Return the filtered list of minifigs
 */
export const getFilteredMinifigsList = (
  list: MinifigsList,
  filters: MinifigFiltersContextProps['filtersValues']
) =>
  list.filter((minifig) => {
    const { display, tag, characterName: filterCharacterName } = filters
    const { possessed, tags, characterName } = minifig
    const showFiltered =
      display === 'all' ||
      (display === 'owned' && possessed) ||
      (display === 'missing' && !possessed)
    const hasFilterTag = tag ? tags?.includes(tag) : true
    const hasFilterCharacName = filterCharacterName ? filterCharacterName === characterName : true
    return showFiltered && hasFilterCharacName && hasFilterTag
  })
