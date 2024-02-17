import { FC, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { AppBar, Button, Toolbar } from '@mui/material'

import Filters from 'components/Filters/Filters'

import useSetsFilters from '../hooks/useSetsFilters'

import SetFormModal from './SetFormModal'

export const SetsMenu: FC = () => {
  const filtersController = useSetsFilters()
  const [open, setOpen] = useState(false)
  return (
    <>
      <AppBar position="sticky" sx={{ top: 48, zIndex: 100 }}>
        <Toolbar
          variant="dense"
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: theme.spacing(2),
          })}
        >
          <Filters {...filtersController} />
          <Button
            variant="contained"
            endIcon={<MdAdd />}
            size="small"
            onClick={() => setOpen(true)}
          >
            Add a set
          </Button>
        </Toolbar>
      </AppBar>
      {open && <SetFormModal handleClose={() => setOpen(false)} />}
    </>
  )
}

export default SetsMenu
