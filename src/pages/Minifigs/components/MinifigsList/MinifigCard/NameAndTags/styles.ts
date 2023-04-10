import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
export default useStyles
