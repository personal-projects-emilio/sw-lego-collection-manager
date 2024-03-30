import { FC } from 'react'
import { RiMoneyEuroCircleLine } from 'react-icons/ri'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'

import { useSetsQuery } from 'api/sets'
import { frEuroCurrency } from 'utils/format'
import { getSetsPricesStatistics } from 'utils/sets'

export const SetPricesStatistics: FC = () => {
  const { data } = useSetsQuery()

  if (!data) return <RiMoneyEuroCircleLine size={24} />

  const { totalBought, totalMarketValue, totalStoreValue } = getSetsPricesStatistics(data)

  return (
    <Tooltip
      title={
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Bought</TableCell>
                  <TableCell>{frEuroCurrency.format(totalBought)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Store value</TableCell>
                  <TableCell>{frEuroCurrency.format(totalStoreValue)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Market value</TableCell>
                  <TableCell>{frEuroCurrency.format(totalMarketValue)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      }
    >
      <Box sx={{ display: 'flex' }}>
        <RiMoneyEuroCircleLine size={24} />
      </Box>
    </Tooltip>
  )
}
export default SetPricesStatistics
