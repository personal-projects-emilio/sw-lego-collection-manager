import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  tooltip: {
    maxWidth: 'none',
    backgroundColor: theme.palette.grey[800],
  },
  timeline: {
    maxHeight: '100vh',
    maxWidth: '100vw',
    overflow: 'auto',
    '& .MuiTimelineDot-root': {
      backgroundColor: theme.palette.grey[900],
      fontSize: 40,
      '& svg': {
        height: '40px',
        width: '40px',
      },
    },
    '& .MuiTimelineOppositeContent-root, .MuiTimelineContent-root': {
      display: 'grid',
      alignContent: 'center',
      margin: theme.spacing(1, 0),
    },
  },
}))

export default useStyles
