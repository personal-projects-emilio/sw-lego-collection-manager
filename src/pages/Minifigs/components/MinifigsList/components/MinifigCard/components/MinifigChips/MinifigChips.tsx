import { FC } from 'react'
import { Chip, Divider } from '@mui/material'

import TimelinesInfoTooltip from 'components/TimelinesInfoTooltip'
import useMinifigsFilters from 'pages/Minifigs/hooks/useMinifigsFilters'
import { Minifig } from 'types/minifigs'

import useStyles from './styles'

type MinifigChipsProps = Pick<
  Minifig,
  'tags' | 'characterName' | 'timelines' | 'appearances' | 'id'
>

const MinifigChips: FC<MinifigChipsProps> = ({
  tags,
  characterName,
  timelines,
  appearances,
  id,
}) => {
  const { classes } = useStyles()
  const { handleApplyFilter, handleDeleteFilter, filtersValues, filterConfigs } =
    useMinifigsFilters()
  const isActiveCharacterNameFilter = filtersValues.characterName === characterName
  return (
    <>
      <Chip
        variant="filled"
        label={characterName}
        {...(isActiveCharacterNameFilter
          ? {
              onDelete: () => handleDeleteFilter('characterName'),
              color: 'primary',
            }
          : {
              onClick: () =>
                handleApplyFilter(
                  'characterName',
                  filterConfigs.characterName.options?.find((el) => el.value === characterName)
                ),
            })}
      />
      {!!tags?.length && (
        <>
          <Divider variant="fullWidth" />
          <div className={classes.tagContainer}>
            {tags.map((tag) => {
              const isActiveTagFilter = filtersValues.tag === tag

              return (
                <Chip
                  variant="filled"
                  key={`${id}-${characterName}-${tag}`}
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
          </div>
        </>
      )}
      {(!!timelines?.length || !!appearances?.length) && (
        <>
          <Divider variant="fullWidth" />
          <div className={classes.tagContainer}>
            {timelines?.map((timeline) => {
              const isActiveTimelineFilter = filtersValues.timeline === timeline

              return (
                <Chip
                  variant="filled"
                  key={`${id}-${characterName}-${timeline}`}
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
                  key={`${id}-${characterName}-${appearance}`}
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
            <TimelinesInfoTooltip />
          </div>
        </>
      )}
    </>
  )
}

export default MinifigChips
