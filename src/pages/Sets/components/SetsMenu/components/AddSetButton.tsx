import { FC, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { Button } from '@mui/material'

import SetFormModal from '../../SetFormModal'

export const AddSetButton: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="contained" endIcon={<MdAdd />} size="small" onClick={() => setOpen(true)}>
        Add a set
      </Button>
      {open && <SetFormModal handleClose={() => setOpen(false)} />}
    </>
  )
}
export default AddSetButton
