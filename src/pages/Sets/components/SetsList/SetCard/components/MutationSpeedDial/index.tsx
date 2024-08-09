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

import { useToggle } from 'hooks'
import useSetsMutation from 'hooks/useSetsMutations'
import SetFormModal from 'pages/Sets/components/SetFormModal/SetFormModal'
import { Set } from 'types/sets'

import useStyles from './style'

export const MutationSpeedDial: FC<Set> = (props) => {
  const { classes } = useStyles()
  const { id, tags = [], timelines = [], appearances = [] } = props
  const { deleteSet } = useSetsMutation()
  const [isEditModalOpen, toggleEditModalOpen] = useToggle()
  const [isDuplicateModalOpen, toggleDuplicateModalOpen] = useToggle()
  const [isDeleteModalOpen, toggleDeleteModalOpen] = useToggle()

  const handleDelete = () => {
    deleteSet(id)
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
        ariaLabel={`Set ${id} speed dial`}
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
          tooltipTitle="Duplicate character name and tags"
          onClick={handleDuplicateClick}
        />
        <SpeedDialAction
          icon={<MdDelete />}
          tooltipTitle="Delete"
          onClick={() => toggleDeleteModalOpen()}
        />
      </SpeedDial>
      {(isEditModalOpen || isDuplicateModalOpen) && (
        <SetFormModal
          handleClose={() => (isEditModalOpen ? toggleEditModalOpen() : toggleDuplicateModalOpen())}
          editionSetData={isEditModalOpen ? props : { tags, timelines, appearances }}
        />
      )}
      {isDeleteModalOpen && (
        <Dialog
          open
          onClose={() => toggleDeleteModalOpen()}
          aria-labelledby="set-delete-dialog"
          maxWidth="md"
        >
          <DialogTitle id="set-delete-dialog">
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
