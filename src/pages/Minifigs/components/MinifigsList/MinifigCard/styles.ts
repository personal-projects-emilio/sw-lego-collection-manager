import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  paper: {
    display: 'grid',
    justifyItems: 'center',
    alignContent: 'space-between',
    textAlign: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    height: '100%',
    '& :not(.MuiDivider-vertical).MuiDivider-root': {
      width: `calc(100% + ${theme.spacing(2)})`,
    },
    '& .MuiTypography-root': { width: '100%' },
  },
  detailsContainer: {
    display: 'grid',
    gap: theme.spacing(1),
    justifyItems: 'center',
    width: '100%',
  },
  img: {
    width: 'auto',
    maxWidth: 'min(90%, 222px)',
    maxHeight: 'min(100%, 333px)',
  },
  linkContainer: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    '& .MuiDivider-root': {
      height: `calc(100% + ${theme.spacing(2)})`,
      marginTop: theme.spacing(-1),
    },
  },
}))

export default useStyles
