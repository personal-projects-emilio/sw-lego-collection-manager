import { SetFiltersContextProps } from 'pages/Sets/hooks/useSetsFilters'
import { SetsList, SetsListStatistics } from 'types/sets'

import { statisticsHelper } from './array'
import { searchInObject } from './filters'

/**
 * Return the tags, character names, timelines and appearances alphabetically sorted lists and some other misce stats from a SetsList
 */
export const getSetsListStatistics = (setsList: SetsList) => {
  return setsList.reduce<SetsListStatistics>(
    (accumulator, { tags, timelines, appearances, subtheme, releaseYear }) => {
      return {
        ...accumulator,
        appearances: statisticsHelper(appearances, accumulator.appearances),
        tags: statisticsHelper(tags, accumulator.tags),
        timelines: statisticsHelper(timelines, accumulator.timelines),
        subtheme: statisticsHelper(subtheme, accumulator.subthemes),
        releaseYear: statisticsHelper(String(releaseYear), accumulator.releaseYear),
      }
    },
    {
      appearances: [],
      tags: [],
      timelines: [],
      subthemes: [],
      releaseYear: [],
    }
  )
}

/**
 * Return the list of sets filtered by display, tag, timeline, appearance, release year and subtheme
 */
export const getFilteredSetsList = (
  list: SetsList,
  filters: SetFiltersContextProps['filtersValues']
) =>
  list.filter((set) => {
    const {
      display,
      tag,
      timeline,
      appearance,
      subtheme: filterSubtheme,
      search,
      releaseYear: filterReleaseYear,
    } = filters
    const { possessed, tags, timelines, appearances, subtheme: setSubtheme, releaseYear } = set
    const displayFiltered =
      display === 'all' ||
      (display === 'owned' && possessed) ||
      (display === 'missing' && !possessed)
    const hasFilterSubtheme = filterSubtheme ? filterSubtheme === setSubtheme : true
    const hasFilterTag = tag ? tags?.includes(tag) : true
    const hasFilterAppearance = appearance ? appearances?.includes(appearance) : true
    const hasFilterTimeline = timeline ? timelines?.includes(timeline) : true
    const isReleaseYear = filterReleaseYear ? filterReleaseYear === String(releaseYear) : true
    const hasSearch = search ? searchInObject(set, search) : true
    return (
      displayFiltered &&
      hasFilterTag &&
      hasFilterTimeline &&
      hasFilterAppearance &&
      hasFilterSubtheme &&
      isReleaseYear &&
      hasSearch
    )
  })
