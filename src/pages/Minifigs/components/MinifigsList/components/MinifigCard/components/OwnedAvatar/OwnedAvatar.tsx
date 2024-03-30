import { FC } from 'react'
import { FaCheck } from 'react-icons/fa'
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'

import { Minifig } from 'types/minifigs'

import useStyles from './styles'

type OwnedAvatarProps = Minifig['owned'] & Pick<Minifig, 'id'>

const OwnedAvatar: FC<OwnedAvatarProps> = ({ inSet, loose, total, id }) => {
  const { classes } = useStyles()

  const avatar = <Avatar className={classes.avatar}>{total}</Avatar>

  if (total === 0) return avatar

  return (
    <Tooltip
      classes={{
        tooltip: classes.tooltip,
      }}
      title={
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Set Id</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>In frame</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inSet?.map(({ isInFrame, quantity, setId }) => (
                <TableRow key={`${id}-${setId}-${quantity}`}>
                  <TableCell>{setId}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell align="center">{isInFrame && <FaCheck />}</TableCell>
                </TableRow>
              ))}
              {loose.quantity > 0 && (
                <TableRow>
                  <TableCell>Loose</TableCell>
                  <TableCell>{loose.quantity}</TableCell>
                  <TableCell align="center">{loose.isInFrame && <FaCheck />}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      }
    >
      {avatar}
    </Tooltip>
  )
}

export default OwnedAvatar
