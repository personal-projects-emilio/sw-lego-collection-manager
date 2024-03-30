import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  paper: {
    display: 'grid',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    boxSizing: 'border-box',
    height: '100%',
    gridTemplateColumns: '40% 1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: `
      "a b"
      "a d"
      "a e"
      `,
    '& .MuiTypography-root': { width: '100%' },
  },
  img: {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: 222,
    gridArea: 'a',
    justifySelf: 'baseline',
  },
  chips: {
    gridArea: 'd',
    display: 'flex',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    alignSelf: 'baseline',
    '& .MuiDivider-root': {
      flexBasis: '100%',
    },
  },
  linkContainer: {
    gridArea: 'e',
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
}))

export default useStyles
