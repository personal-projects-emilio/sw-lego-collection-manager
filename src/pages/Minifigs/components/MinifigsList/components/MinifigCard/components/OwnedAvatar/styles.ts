import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.dark,
  },
  tooltip: {
    maxHeight: '40vh',
    overflowX: 'auto',
    maxWidth: 'unset',
    width: '100%',
  },
}))
export default useStyles
