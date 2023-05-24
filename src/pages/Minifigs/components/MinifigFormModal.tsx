import { FC, useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material'

import { useMinifigsQuery } from 'api/minifigs'
import { Autocomplete } from 'components/inputs/Autocomplete'
import { useMinifigsMutations } from 'hooks'
import { Minifig, minifigValidationSchema } from 'types/minifigs'
import { formatOptionsFromLabelAndAmout } from 'utils/filters'
import { getMinifigsListStatistics } from 'utils/minifigs'

export interface MinifigFormModalProps {
  handleClose: () => void
  editionMinifigData?: Partial<Minifig>
}

const isEditMode = (
  editionData: MinifigFormModalProps['editionMinifigData']
): editionData is Minifig => Boolean(editionData?.id)

export const MinifigFormModal: FC<MinifigFormModalProps> = ({
  handleClose,
  editionMinifigData,
}) => {
  const { data: minifigsList } = useMinifigsQuery()
  const { addMinifig, editMinifig, isLoading } = useMinifigsMutations()
  const editMode = isEditMode(editionMinifigData)
  const minifigStatistics = useMemo(
    () => getMinifigsListStatistics(minifigsList ?? []),
    [minifigsList]
  )

  const options = useMemo(
    () => ({
      appearances: formatOptionsFromLabelAndAmout(minifigStatistics?.appearances, true),
      characterNames: formatOptionsFromLabelAndAmout(minifigStatistics?.characterNames, true),
      tags: formatOptionsFromLabelAndAmout(minifigStatistics?.tags, true),
      timelines: formatOptionsFromLabelAndAmout(minifigStatistics?.timelines, true),
    }),
    [minifigStatistics]
  )
  const minifigsListIds = useMemo(
    () => minifigsList?.map((minifig) => minifig.id) || [],
    [minifigsList]
  )

  const minifigValidationSchemaWithRefinedIdCheck = useMemo(
    () =>
      minifigValidationSchema.refine(
        ({ id }) => {
          if (!editMode) return !minifigsListIds.includes(id)
          if (editMode) return editionMinifigData?.id === id
        },
        {
          path: ['id'],
          message: 'This minifig already exists',
        }
      ),
    [minifigsListIds, editMode, editionMinifigData]
  )

  const { control, reset, unregister, handleSubmit } = useForm<Minifig>({
    defaultValues: {
      appearances: [],
      characterName: '',
      id: '',
      name: '',
      possessed: false,
      tags: [],
      timelines: [],
      ...editionMinifigData,
    },
    resolver: zodResolver(minifigValidationSchemaWithRefinedIdCheck),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const onSubmit: SubmitHandler<Minifig> = async (data) => {
    if (editMode) {
      return editMinifig(data).then(onClose)
    }
    return addMinifig(data).then(onClose)
  }

  const onClose = () => {
    handleClose()
    reset()
    unregister()
  }
  return (
    <Dialog open onClose={onClose} aria-labelledby="minifig-form-dialog" maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle id="minifig-form-dialog">
          {editMode ? `Edit ${editionMinifigData.id}` : 'Add a minifig'}
        </DialogTitle>
        <DialogContent
          dividers
          sx={(theme) => ({
            display: 'grid',
            gap: theme.spacing(2),
          })}
        >
          <Controller
            name="id"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Id"
                placeholder="Minifig id (ex: sw0001a)"
                disabled={editMode}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                required
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Name"
                placeholder="Minifig name (ex: Battle Droid Tan with Back Plate)"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                required
              />
            )}
          />
          <Controller
            name="characterName"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                label="Character Name"
                creatable
                options={options.characterNames ?? []}
                TextFieldProps={{
                  placeholder: 'Character name (ex: Battle Droid)',
                  error: fieldState.invalid,
                  helperText: fieldState.error?.message,
                  required: true,
                }}
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                label="Tags"
                creatable
                multiple
                options={options.tags ?? []}
                TextFieldProps={{
                  placeholder: 'Minifig tags (ex: Battle Droid, CIS, Droid)',
                  error: fieldState.invalid,
                  helperText: fieldState.error?.message,
                }}
              />
            )}
          />
          <Controller
            name="timelines"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                label="Timelines"
                creatable
                multiple
                options={options.timelines ?? []}
                TextFieldProps={{
                  placeholder: 'Minifig timelines (ex: Fall of the Jedi, Age of Rebellion)',
                  error: fieldState.invalid,
                  helperText: fieldState.error?.message,
                }}
              />
            )}
          />
          <Controller
            name="appearances"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                label="Appearances"
                creatable
                multiple
                options={options.appearances ?? []}
                TextFieldProps={{
                  placeholder: 'Minifig appearances (ex: The Mandalorian, The Clone Wars...)',
                  error: fieldState.invalid,
                  helperText: fieldState.error?.message,
                }}
              />
            )}
          />
          <Controller
            name="possessed"
            control={control}
            render={({ field }) => (
              <FormControlLabel label="Possessed" control={<Switch {...field} />} />
            )}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={onClose} color="primary" loading={isLoading}>
            Cancel
          </LoadingButton>
          <LoadingButton type="submit" color="primary" variant="contained" loading={isLoading}>
            {editMode ? `Edit ${editionMinifigData.id}` : 'Add a minifig'}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default MinifigFormModal
