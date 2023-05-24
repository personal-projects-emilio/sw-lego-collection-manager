import { MinifigFiltersContextProps } from 'pages/Minifigs/hooks/useMinifigsFilters'
import { LabelAndAmout } from 'types/common'
import { MinifigsList, MinifigsListStatistics } from 'types/minifigs'

/**
 * Return the tags, character names, timelines and appearances alphabetically sorted lists and some other misce stats from a MinifigsList
 */
export const getMinifigsListStatistics = (minifigsList: MinifigsList) => {
  const minifigsListStatistics = minifigsList.reduce<MinifigsListStatistics>(
    (accumulator, currentMinifig, index) => {
      const { characterName, tags, possessed, timelines, appearances } = currentMinifig

      if (possessed) accumulator.numberPossessed++

      if (index === minifigsList.length - 1) {
        accumulator.totalNumber = minifigsList.length
        accumulator.percentageOwned =
          Math.round((accumulator.numberPossessed / accumulator.totalNumber) * 10000) / 100
      }

      return {
        ...accumulator,
        appearances: minifigStatisticsHelper(appearances, accumulator.appearances),
        characterNames: minifigStatisticsHelper(characterName, accumulator.characterNames),
        tags: minifigStatisticsHelper(tags, accumulator.tags),
        timelines: minifigStatisticsHelper(timelines, accumulator.timelines),
      }
    },
    {
      appearances: [],
      characterNames: [],
      numberPossessed: 0,
      percentageOwned: 0,
      tags: [],
      timelines: [],
      totalNumber: 0,
    }
  )

  minifigsListStatistics.appearances.sort((a, b) => a.label.localeCompare(b.label))
  minifigsListStatistics.characterNames.sort((a, b) => a.label.localeCompare(b.label))
  minifigsListStatistics.tags.sort((a, b) => a.label.localeCompare(b.label))
  minifigsListStatistics.timelines.sort((a, b) => a.label.localeCompare(b.label))

  return minifigsListStatistics
}

const minifigStatisticsHelper = (
  element: string | string[] | undefined,
  accumulator: LabelAndAmout[]
) => {
  if (!element) return accumulator

  if (typeof element === 'string') {
    const existingIndex = accumulator.findIndex((el) => el.label === element)
    // If it is a new character name we had it to the accumulator
    if (existingIndex === -1) {
      accumulator.push({ label: element, amount: 1 })
    } else {
      // Or else we increment the amount of the existing one
      accumulator[existingIndex].amount++
    }
    return accumulator
  }

  element.forEach((label) => {
    const existingIndex = accumulator.findIndex((el) => el.label === label)
    // If it is a new appearance we had it to the accumulator
    if (existingIndex === -1) {
      accumulator.push({ label, amount: 1 })
    } else {
      // Or else we increment the amount of the existing one
      accumulator[existingIndex].amount++
    }
  })
  return accumulator
}

/**
 * Return the filtered list of minifigs
 */
export const getFilteredMinifigsList = (
  list: MinifigsList,
  filters: MinifigFiltersContextProps['filtersValues']
) =>
  list.filter((minifig) => {
    const { display, tag, timeline, characterName: filterCharacterName, appearance } = filters
    const { possessed, tags, characterName, timelines, appearances } = minifig
    const showFiltered =
      display === 'all' ||
      (display === 'owned' && possessed) ||
      (display === 'missing' && !possessed)
    const hasFilterTag = tag ? tags?.includes(tag) : true
    const hasFilterAppearance = appearance ? appearances?.includes(appearance) : true
    const hasFilterCharacName = filterCharacterName ? filterCharacterName === characterName : true
    const hasFilterTimeline = timeline ? timelines?.includes(timeline) : true
    return (
      showFiltered &&
      hasFilterCharacName &&
      hasFilterTag &&
      hasFilterTimeline &&
      hasFilterAppearance
    )
  })
