import { FC } from 'react'
import { Divider, Paper, Switch, Tooltip, Typography } from '@mui/material'

import LogoLink from 'components/LogoLink'
import OverflowTypography from 'components/OverflowTypography'
import { useMinifigsMutations } from 'hooks'
import { Minifig } from 'types/minifigs'

import MinifigChips from './components/MinifigChips'
import MutationSpeedDial from './components/MutationSpeedDial'
import OwnedAvatar from './components/OwnedAvatar'

import useStyles from './styles'

export const MinifigCard: FC<Minifig> = (minifig) => {
  const { classes } = useStyles()
  const { toggleMinifigPossession, isPending } = useMinifigsMutations()
  const { id, name, possessed, owned, ...restMinifig } = minifig
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
        <MinifigChips {...restMinifig} id={id} />
        <Divider />
        <div className={classes.linkContainer}>
          <LogoLink id={id} variant="minifig" target="bricklink" />
          <LogoLink id={id} variant="minifig" target="brickset" />
          <Divider flexItem orientation="vertical" />
          <OwnedAvatar {...owned} id={id} />
          <Divider flexItem orientation="vertical" />
          <Tooltip title={isPending ? 'Mutating...' : undefined}>
            <span>
              <Switch
                value={possessed}
                checked={possessed}
                disabled={isPending}
                onChange={() => toggleMinifigPossession(id)}
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
