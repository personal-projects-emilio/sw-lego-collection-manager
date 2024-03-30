import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: '1fr repeat(2, max-content)',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  isAuthenticated: {
    gridTemplateColumns: '1fr repeat(3, max-content)',
  },
}))

export default useStyles
