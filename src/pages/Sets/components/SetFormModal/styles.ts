import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  grid3: {
    gridColumn: 'span 3',
  },
  grid4: {
    gridColumn: 'span 4',
  },
  grid6: { gridColumn: 'span 6' },
  grid12: { gridColumn: 'span 12' },
}))

export default useStyles
