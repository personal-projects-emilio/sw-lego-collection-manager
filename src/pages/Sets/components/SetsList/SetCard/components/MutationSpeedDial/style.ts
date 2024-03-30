import { alpha } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  root: {
    maxHeight: 40,
    maxWidth: 40,
    '& .MuiFab-sizeSmall': {
      fontSize: '1.5rem',
      minHeight: 40,
      minWidth: 40,
    },
  },
  actions: {
    backgroundColor: alpha(theme.palette.grey[900], 0.8),
  },
  actionsClosed: {
    backgroundColor: 'transparent',
  },
}))

export default useStyles
