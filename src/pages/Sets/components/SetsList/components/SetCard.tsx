import { FC } from 'react'
import { Divider, Paper, Switch, Tooltip } from '@mui/material'

import LogoLink from 'components/LogoLink'
import OverflowTypography from 'components/OverflowTypography'
import useSetsMutation from 'hooks/useSetsMutations'
import { Set } from 'types/sets'

import MutationSpeedDial from './components/MutationSpeedDial'
import SetChips from './components/SetChips'

import useStyles from './styles'

export const SetCard: FC<Set> = (set) => {
  const { classes } = useStyles()
  const { toggleSetPossession, isLoading } = useSetsMutation()
  const { id, name, possessed } = set
  return (
    <Paper classes={{ root: classes.paper }}>
      <img
        className={classes.img}
        src={`https://img.bricklink.com/ItemImage/SN/0/${id}-1.png`}
        loading="lazy"
        alt={`${id}-bricklink-png`}
      />
      <OverflowTypography variant="subtitle1">{`${id}: ${name}`}</OverflowTypography>
      <div className={classes.chips}>
        <SetChips size="small" {...set} />
      </div>
      <div className={classes.linkContainer}>
        <LogoLink id={id} variant="set" target="bricklink" />
        <LogoLink id={id} variant="set" target="brickset" />
        <Divider flexItem orientation="vertical" />
        <Tooltip title={isLoading ? 'Mutating...' : undefined}>
          <span>
            <Switch
              value={possessed}
              checked={possessed}
              disabled={isLoading}
              onChange={() => toggleSetPossession(id)}
            />
          </span>
        </Tooltip>
        <MutationSpeedDial {...set} />
      </div>
    </Paper>
  )
}

export default SetCard
