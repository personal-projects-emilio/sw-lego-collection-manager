import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    gridGap: theme.spacing(1),
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dialogContent: {
    display: 'grid',
    gridGap: theme.spacing(2),
    overflow: 'visible',
  },
  minifigElement: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey['700'],
    borderRadius: theme.shape.borderRadius,
    justifyItems: 'center',
  },
  span1: {
    gridColumn: 'span 1',
  },
  span2: {
    gridColumn: 'span 2',
  },
}))

export default useStyles
