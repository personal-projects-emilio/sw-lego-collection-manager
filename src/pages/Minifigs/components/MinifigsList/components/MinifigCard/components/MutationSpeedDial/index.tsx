import { FC } from 'react'
import { MdContentCopy, MdDelete, MdEdit, MdEditNote } from 'react-icons/md'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  SpeedDial,
  SpeedDialAction,
} from '@mui/material'

import { useMinifigsMutations, useToggle } from 'hooks'
import MinifigFormModal from 'pages/Minifigs/components/MinifigFormModal'
import { Minifig } from 'types/minifigs'

import useStyles from './style'

export const MutationSpeedDial: FC<Minifig> = (props) => {
  const { classes } = useStyles()
  const { id, appearances = [], characterName, tags = [], timelines = [] } = props
  const { deleteMinifig } = useMinifigsMutations()
  const [isEditModalOpen, toggleEditModalOpen] = useToggle()
  const [isDuplicateModalOpen, toggleDuplicateModalOpen] = useToggle()
  const [isDeleteModalOpen, toggleDeleteModalOpen] = useToggle()

  const handleDelete = () => {
    deleteMinifig(id)
    toggleDeleteModalOpen(false)
  }

  const handleEditClick = () => {
    toggleEditModalOpen()
  }

  const handleDuplicateClick = () => {
    toggleDuplicateModalOpen()
  }

  return (
    <>
      <SpeedDial
        ariaLabel={`Minifig ${id} speed dial`}
        icon={<MdEditNote />}
        classes={{
          root: classes.root,
          actions: classes.actions,
          actionsClosed: classes.actionsClosed,
        }}
        FabProps={{
          size: 'small',
        }}
      >
        <SpeedDialAction icon={<MdEdit />} tooltipTitle="Edit" onClick={handleEditClick} />
        <SpeedDialAction
          icon={<MdContentCopy />}
          tooltipTitle="Duplicate character appearances, character name, tags and timelines"
          onClick={handleDuplicateClick}
        />
        <SpeedDialAction
          icon={<MdDelete />}
          tooltipTitle="Delete"
          onClick={() => toggleDeleteModalOpen()}
        />
      </SpeedDial>
      {(isEditModalOpen || isDuplicateModalOpen) && (
        <MinifigFormModal
          handleClose={() => (isEditModalOpen ? toggleEditModalOpen() : toggleDuplicateModalOpen())}
          editionMinifigData={
            isEditModalOpen ? props : { tags, characterName, timelines, appearances }
          }
        />
      )}
      {isDeleteModalOpen && (
        <Dialog
          open
          onClose={() => toggleDeleteModalOpen()}
          aria-labelledby="minifig-delete-dialog"
          maxWidth="md"
        >
          <DialogTitle id="minifig-delete-dialog">
            {`Are you sure you want to delete ${id}?`}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => toggleDeleteModalOpen()} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default MutationSpeedDial
