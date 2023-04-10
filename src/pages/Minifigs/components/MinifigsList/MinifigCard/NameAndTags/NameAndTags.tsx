import { FC } from 'react'
import { Chip, Divider } from '@mui/material'

import useMinifigsFilters from 'pages/Minifigs/hooks/useMinifigsFilters'
import { Minifig } from 'types/minifigs'

import useStyles from './styles'

type NameAndTagsProps = Pick<Minifig, 'tags' | 'characterName'>

const NameAndTags: FC<NameAndTagsProps> = ({ tags, characterName }) => {
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
                  key={`${characterName}-${tag}`}
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
    </>
  )
}

export default NameAndTags
