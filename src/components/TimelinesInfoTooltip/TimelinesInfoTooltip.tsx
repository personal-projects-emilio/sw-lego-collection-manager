import { FC } from 'react'
import { MdInfoOutline } from 'react-icons/md'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'
import { Tooltip, Typography } from '@mui/material'

import { starWarsTimeline } from './constants'

import useStyles from './styles'

export const TimelinesInfoTooltip: FC = () => {
  const { classes } = useStyles()
  return (
    <Tooltip
      classes={{
        tooltip: classes.tooltip,
      }}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                altAxis: true,
                // mainAxis: false,
                // padding: theme.spacing(2),
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'right', 'left'],
              },
            },
          ],
        },
      }}
      title={
        <Timeline className={classes.timeline}>
          {starWarsTimeline.map(({ title, icon, showsAndMovies }) => (
            <TimelineItem key={title}>
              <TimelineOppositeContent variant="h5">{title}</TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>{icon}</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                {showsAndMovies.map((title) => (
                  <Typography key={title} display="block" variant="caption">
                    {title}
                  </Typography>
                ))}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      }
    >
      <span className={classes.iconContainer}>
        <MdInfoOutline className={classes.icon} />
      </span>
    </Tooltip>
  )
}

export default TimelinesInfoTooltip
