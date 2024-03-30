import { FC } from 'react'
import { Chip, ChipProps, Divider } from '@mui/material'

import TimelinesInfoTooltip from 'components/TimelinesInfoTooltip'
import useSetsFilters from 'pages/Sets/hooks/useSetsFilters'
import { Set } from 'types/sets'

type SetChipsProps = Set & Pick<ChipProps, 'size'>

const SetChips: FC<SetChipsProps> = ({
  id,
  tags,
  subtheme,
  timelines,
  appearances,
  releaseYear,
  size = 'medium',
}) => {
  const { handleApplyFilter, handleDeleteFilter, filtersValues, filterConfigs } = useSetsFilters()
  const isActiveSubthemeFilter = filtersValues.subtheme === subtheme
  const isReleaseYearFilter = filtersValues.releaseYear === String(releaseYear)
  return (
    <>
      <Chip
        variant="filled"
        size={size}
        label={subtheme}
        {...(isActiveSubthemeFilter
          ? {
              onDelete: () => handleDeleteFilter('subtheme'),
              color: 'primary',
            }
          : {
              onClick: () =>
                handleApplyFilter(
                  'subtheme',
                  filterConfigs.subtheme.options?.find((el) => el.value === subtheme)
                ),
            })}
      />
      <Chip
        variant="filled"
        size={size}
        label={releaseYear}
        {...(isReleaseYearFilter
          ? {
              onDelete: () => handleDeleteFilter('releaseYear'),
              color: 'primary',
            }
          : {
              onClick: () =>
                handleApplyFilter(
                  'releaseYear',
                  filterConfigs.releaseYear.options?.find((el) => el.value === String(releaseYear))
                ),
            })}
      />
      {Boolean(tags?.length) && (
        <>
          <Divider flexItem />
          {tags.map((tag) => {
            const isActiveTagFilter = filtersValues.tag === tag

            return (
              <Chip
                variant="filled"
                size={size}
                key={`${id}-${tag}`}
                label={tag}
                {...(isActiveTagFilter
                  ? {
                      onDelete: () => handleDeleteFilter('tag'),
                      color: 'primary',
                    }
                  : {
                      onClick: () =>
                        handleApplyFilter(
                          'tag',
                          filterConfigs.tag.options?.find((el) => el.value === tag)
                        ),
                    })}
              />
            )
          })}
        </>
      )}
      {(Boolean(timelines?.length) || Boolean(appearances?.length)) && (
        <>
          <Divider flexItem />
          <TimelinesInfoTooltip />
          {timelines?.map((timeline) => {
            const isActiveTimelineFilter = filtersValues.timeline === timeline

            return (
              <Chip
                variant="filled"
                size={size}
                key={`${id}-${timeline}`}
                label={timeline}
                {...(isActiveTimelineFilter
                  ? {
                      onDelete: () => handleDeleteFilter('timeline'),
                      color: 'primary',
                    }
                  : {
                      onClick: () =>
                        handleApplyFilter(
                          'timeline',
                          filterConfigs.timeline.options?.find((el) => el.value === timeline)
                        ),
                    })}
              />
            )
          })}
          {appearances?.map((appearance) => {
            const isActiveAppearanceFilter = filtersValues.appearance === appearance

            return (
              <Chip
                variant="filled"
                size={size}
                key={`${id}-${appearance}`}
                label={appearance}
                {...(isActiveAppearanceFilter
                  ? {
                      onDelete: () => handleDeleteFilter('appearance'),
                      color: 'primary',
                    }
                  : {
                      onClick: () =>
                        handleApplyFilter(
                          'appearance',
                          filterConfigs.appearance.options?.find((el) => el.value === appearance)
                        ),
                    })}
              />
            )
          })}
        </>
      )}
    </>
  )
}

export default SetChips
