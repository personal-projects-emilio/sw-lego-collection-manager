import { MinifigFiltersContextProps } from 'pages/Minifigs/hooks/useMinifigsFilters'
import { MinifigsList, MinifigsListStatistics } from 'types/minifigs'

import { statisticsHelper } from './array'

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
        appearances: statisticsHelper(appearances, accumulator.appearances),
        characterNames: statisticsHelper(characterName, accumulator.characterNames),
        tags: statisticsHelper(tags, accumulator.tags),
        timelines: statisticsHelper(timelines, accumulator.timelines),
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
    const displayFiltered =
      display === 'all' ||
      (display === 'owned' && possessed) ||
      (display === 'missing' && !possessed)
    const hasFilterTag = tag ? tags?.includes(tag) : true
    const hasFilterAppearance = appearance ? appearances?.includes(appearance) : true
    const hasFilterCharacName = filterCharacterName ? filterCharacterName === characterName : true
    const hasFilterTimeline = timeline ? timelines?.includes(timeline) : true
    return (
      displayFiltered &&
      hasFilterCharacName &&
      hasFilterTag &&
      hasFilterTimeline &&
      hasFilterAppearance
    )
  })
