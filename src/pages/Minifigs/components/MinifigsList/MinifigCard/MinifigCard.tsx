import { FC } from 'react'
import { Divider, Paper, Switch, Typography } from '@mui/material'

import LogoLink from 'components/LogoLink'
import OverflowTypography from 'components/OverflowTypography'
import { Minifig } from 'types/minifigs'

import NameAndTags from './NameAndTags'

import useStyles from './styles'

export const MinifigCard: FC<Minifig> = ({ id, name, characterName, tags, possessed }) => {
  const { classes } = useStyles()
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
          <Switch value={possessed} checked={possessed} disabled />
          <Divider flexItem orientation="vertical" />
          <LogoLink id={id} variant="minifig" target="bricklink" />
          <LogoLink id={id} variant="minifig" target="brickset" />
        </div>
        {/* TODO: Add minifig edition */}
        {/* <Divider /> */}
        {/* <MinifigEdition {...minifig} /> */}
      </div>
    </Paper>
  )
}

export default MinifigCard
