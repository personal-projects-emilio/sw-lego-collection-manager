import { forwardRef, useEffect, useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  MdAddCircleOutline,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdEdit,
} from 'react-icons/md'
import { LoadingButton } from '@mui/lab'
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'

import { useMinifigsQuery } from 'api/minifigs'
import { Checkbox } from 'components/inputs'
import { Autocomplete } from 'components/inputs/Autocomplete'
import { useToggle } from 'hooks'
import { Set } from 'types/sets'

import useStyles from './styles'

type SetMinifigsProps = {
  value: Set['content']['minifigs']
  onChange: (value: Set['content']['minifigs']) => void
  className: HTMLElement['className']
}

type SetIndividualMinifigProps = {
  id: string
  quantity: number
  characterName: string
  isInFrame: boolean
}
const initialMinifigState: SetIndividualMinifigProps = {
  id: '',
  quantity: 1,
  characterName: '',
  isInFrame: false,
}

export const SetMinifigs = forwardRef<HTMLDivElement, SetMinifigsProps>(
  ({ value, onChange, className }, ref) => {
    const { data: minifigsList, isLoading } = useMinifigsQuery()
    const { classes, cx } = useStyles()
    const [dialogIsOpen, toggleDialogIsOpen] = useToggle()
    const [minifigEditId, setMinifigEditId] = useState<null | string>(null)

    const [values, setValues] = useState<SetIndividualMinifigProps[]>(
      value.sort((a, b) => Number(a.id) - Number(b.id))
    )

    const nbOfMinifigs = useMemo(() => {
      return values.reduce((pre, curr) => {
        return pre + Number(curr.quantity)
      }, 0)
    }, [values])

    useEffect(() => {
      onChange?.(values)
    }, [values, onChange])

    const { control, reset, handleSubmit } = useForm<SetIndividualMinifigProps>({
      defaultValues: initialMinifigState,
      mode: 'all',
    })

    const minifigsOptions = useMemo(
      () =>
        minifigsList?.map((minifig) => ({
          label: `${minifig.id} - ${minifig.characterName}`,
          value: minifig.id,
        })) || [],
      [minifigsList]
    )

    const onSubmit: SubmitHandler<SetIndividualMinifigProps> = (data) => {
      setValues((prevValues) => {
        const dataWithCharacterName = {
          ...data,
          characterName: minifigsList?.find((el) => el.id === data.id)?.characterName ?? '',
        }
        const newValues = [...prevValues, dataWithCharacterName].sort((a, b) =>
          a.id > b.id ? 1 : -1
        )
        if (!minifigEditId) return newValues
        if (minifigEditId === data.id)
          return prevValues.map((el) => (el.id === minifigEditId ? dataWithCharacterName : el))

        return newValues.filter((value) => value.id !== minifigEditId)
      })
      handleClose()
    }

    const handleClose = () => {
      toggleDialogIsOpen(false)
      reset(initialMinifigState)
      setMinifigEditId(null)
    }

    const handleEditMinifig = (minifig: SetIndividualMinifigProps) => {
      toggleDialogIsOpen(true)
      reset(minifig)
      setMinifigEditId(minifig.id)
    }

    return (
      <div className={cx(className, classes.container)} ref={ref}>
        <Typography>{`Minifigs${nbOfMinifigs ? ` (${nbOfMinifigs})` : ''}:`}</Typography>
        {values.map((minifig, minifigIndex) => (
          <div key={`set-minifig-${minifig.id}`} className={classes.minifigElement}>
            <span className={classes.span2}>{`${minifig.id} (x${minifig.quantity})`}</span>
            <span className={classes.span2}>{minifig.characterName}</span>

            <Chip
              variant="outlined"
              className={classes.span2}
              icon={minifig.isInFrame ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
              label="In frame"
            />
            <IconButton
              className={classes.span1}
              size="small"
              onClick={() => {
                handleEditMinifig(minifig)
              }}
              arial-label={`Edit ${minifig.id} from this set`}
            >
              <MdEdit />
            </IconButton>
            <IconButton
              className={classes.span1}
              size="small"
              arial-label={`Delete ${minifig.id} from this set`}
              onClick={() => {
                setValues((preValues) => preValues.filter((_, i) => i !== minifigIndex))
              }}
            >
              <MdDelete />
            </IconButton>
          </div>
        ))}
        <Tooltip title="Add minifigs to this set">
          <IconButton onClick={() => toggleDialogIsOpen()} color="primary">
            <MdAddCircleOutline />
          </IconButton>
        </Tooltip>
        <Dialog open={dialogIsOpen} onClose={handleClose} aria-labelledby="set-minifig-edition">
          <form
            onSubmit={(e) => {
              e.stopPropagation()
              return handleSubmit(onSubmit)(e)
            }}
          >
            <DialogTitle id="set-minifig-edition">{`${
              minifigEditId ? `Edit ${minifigEditId} from this set` : 'Add a minifig to this set'
            }`}</DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <Controller
                name="id"
                control={control}
                rules={{
                  required: 'This field is required',
                  validate: (value) => {
                    if (minifigEditId) return true
                    if (values.map(({ id }) => id).includes(value)) {
                      return 'This minifig is already in the list'
                    }
                    return true
                  },
                }}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    {...field}
                    label="Minifig id"
                    placeholder="Minifig id (ex: sw0001)"
                    options={minifigsOptions}
                    autoFocus={!minifigEditId}
                    TextFieldProps={{
                      error: fieldState.invalid,
                      helperText: fieldState.error?.message,
                      required: true,
                      autoFocus: !minifigEditId,
                    }}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                rules={{
                  required: 'This field is required',
                }}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      {...field}
                      label="Quantity"
                      type="number"
                      onChange={(event) => field?.onChange?.(parseInt(event.target.value, 10))}
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      required
                    />
                  )
                }}
              />
              <Controller
                name="isInFrame"
                control={control}
                render={({ field }) => {
                  return <Checkbox {...field} label="At least one in frame" />
                }}
              />
            </DialogContent>
            <DialogActions>
              <LoadingButton onClick={handleClose} color="primary" loading={isLoading}>
                Cancel
              </LoadingButton>
              <LoadingButton type="submit" color="primary" variant="contained" loading={isLoading}>
                {minifigEditId ? 'Edit' : 'Add'}
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    )
  }
)
SetMinifigs.displayName = 'SetMinifigs'

export default SetMinifigs
