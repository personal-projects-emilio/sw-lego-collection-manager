import { FC } from 'react'
import { Divider, Paper, Switch, Tooltip, Typography } from '@mui/material'

import LogoLink from 'components/LogoLink'
import OverflowTypography from 'components/OverflowTypography'
import { useMinifigsMutations } from 'hooks'
import { Minifig } from 'types/minifigs'

import MutationSpeedDial from './components/MutationSpeedDial'
import NameAndTags from './components/NameAndTags'

import useStyles from './styles'

export const MinifigCard: FC<Minifig> = (minifig) => {
  const { classes } = useStyles()
  const { toggleMinifigOwned, isLoading } = useMinifigsMutations()
  const { id, name, characterName, tags, possessed } = minifig
  return (
    <Paper classes={{ root: classes.paper }}>
      <img
        className={classes.img}
        src={`https://img.bricklink.com/ItemImage/MN/0/${id}.png`}
        alt={`${id}-bricklink-png`}
      />
      <div className={classes.detailsContainer}>
        <Typography variant="button">{id}</Typography>
        <OverflowTypography variant="caption" tooltipProps={{ placement: 'top' }}>
          {name}
        </OverflowTypography>
        <Divider />
        <NameAndTags characterName={characterName} tags={tags} />
        <Divider />
        <div className={classes.linkContainer}>
          <LogoLink id={id} variant="minifig" target="bricklink" />
          <LogoLink id={id} variant="minifig" target="brickset" />
          <Divider flexItem orientation="vertical" />
          <Tooltip title={isLoading ? 'Mutating...' : undefined}>
            <span>
              <Switch
                value={possessed}
                checked={possessed}
                disabled={isLoading}
                onChange={() => toggleMinifigOwned(id)}
              />
            </span>
          </Tooltip>

          <MutationSpeedDial {...minifig} />
        </div>
      </div>
    </Paper>
  )
}

export default MinifigCard
