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
  Typography,
} from '@mui/material'

import { useSetsQuery } from 'api/sets'
import DisplayIfAuthenticated from 'components/DisplayIfAuthenticated'
import { Checkbox } from 'components/inputs'
import { Autocomplete } from 'components/inputs/Autocomplete'
import useSetsMutations from 'hooks/useSetsMutations'
import { Set, setValidationSchema } from 'types/sets'
import { formatOptionsFromLabelAndAmout } from 'utils/filters'
import { getSetsListStatistics } from 'utils/sets'

import { defaultSetFormValues } from './constants'
import SetMinifigs from './SetMinifigs'

import useStyles from './styles'

export type SetFormModalProps = {
  handleClose: () => void
  editionSetData?: Partial<Set>
}

const isEditMode = (editionData: SetFormModalProps['editionSetData']): editionData is Set =>
  Boolean(editionData?.id)

export const SetFormModal: FC<SetFormModalProps> = ({ handleClose, editionSetData }) => {
  const { data: setsList } = useSetsQuery()
  const { classes } = useStyles()
  const { addSet, editSet, isLoading } = useSetsMutations()
  const editMode = isEditMode(editionSetData)
  const setStatistics = useMemo(() => getSetsListStatistics(setsList ?? []), [setsList])
  const options = useMemo(
    () => ({
      appearances: formatOptionsFromLabelAndAmout(setStatistics?.appearances, true),
      tags: formatOptionsFromLabelAndAmout(setStatistics?.tags, true),
      timelines: formatOptionsFromLabelAndAmout(setStatistics?.timelines, true),
      subthemes: formatOptionsFromLabelAndAmout(setStatistics?.subthemes, true),
    }),
    [setStatistics]
  )

  const setsListIds = useMemo(() => setsList?.map((set) => set.id) || [], [setsList])

  const setValidationSchemaWithRefinedIdCheck = useMemo(
    () =>
      setValidationSchema
        .refine(
          ({ id }) => {
            if (!editMode) return !setsListIds.includes(id)
            if (editMode) return editionSetData?.id === id
          },
          {
            path: ['id'],
            message: 'This set already exists',
          }
        )
        .refine(
          ({ possessed, location }) => {
            if (!possessed) return true
            if (possessed) return location.length > 0
          },
          {
            path: ['location'],
            message: 'Location is mandatory if you possess the set!',
          }
        )
        .refine(
          ({ possessed, ownedQuantity }) => {
            if (!possessed) return true
            if (possessed) return ownedQuantity > 0
          },
          {
            path: ['ownedQuantity'],
            message: 'Owned quantity must be superior to 0!',
          }
        ),
    [setsListIds, editMode, editionSetData]
  )

  const { control, reset, unregister, handleSubmit, watch, setValue } = useForm<Set>({
    defaultValues: defaultSetFormValues(editionSetData),
    resolver: zodResolver(setValidationSchemaWithRefinedIdCheck),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const onSubmit: SubmitHandler<Set> = async (data) => {
    try {
      if (editMode) {
        await editSet(data)
      } else {
        await addSet(data)
      }
    } catch {
      console.error('something went wrong')
    } finally {
      onClose()
    }
  }

  const onClose = () => {
    handleClose()
    reset()
    unregister()
  }

  return (
    <Dialog open onClose={onClose} aria-labelledby="set-form-dialog" maxWidth="lg" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle id="set-form-dialog">
          {editMode ? `Edit ${editionSetData.id}` : 'Add a set'}
        </DialogTitle>
        <DialogContent
          dividers
          sx={(theme) => ({
            display: 'grid',
            gap: theme.spacing(2),
            gridTemplateColumns: 'repeat(12, 1fr)',
          })}
        >
          <Controller
            name="id"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                onChange={(event) => {
                  const { value } = event.target
                  if (/\D/.test(value)) {
                    // contains non-digits
                    field?.onChange(value)
                  } else {
                    // contains only digits
                    field?.onChange(parseInt(value, 10))
                  }
                }}
                className={classes.grid12}
                label="Id"
                placeholder="Set id (ex: 75000)"
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
                className={classes.grid12}
                label="Name"
                placeholder="Set name (ex: X-Wing)"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                required
              />
            )}
          />
          <Controller
            name="subtheme"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                className={classes.grid12}
                label="Subtheme"
                creatable
                options={options.subthemes ?? []}
                TextFieldProps={{
                  placeholder: 'Set subtheme (ex: UCS, Seasonal...)',
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
                className={classes.grid12}
                label="Tags"
                creatable
                multiple
                options={options.tags ?? []}
                TextFieldProps={{
                  placeholder: 'Set tags (ex: Endor, Starfighter, Rebel Alliance...)',
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
                className={classes.grid12}
                label="Appearances"
                creatable
                multiple
                options={options.appearances ?? []}
                TextFieldProps={{
                  placeholder: 'Set appearances (ex: The Mandalorian, The Clone Wars...)',
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
                className={classes.grid12}
                label="Timelines"
                creatable
                multiple
                options={options.timelines ?? []}
                TextFieldProps={{
                  placeholder: 'Set timelines (ex: Fall of the Jedi, Age of Rebellion)',
                  error: fieldState.invalid,
                  helperText: fieldState.error?.message,
                }}
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                className={classes.grid12}
                label="Location"
                placeholder="Set location (ex: Attic, Office...)"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                multiline
              />
            )}
          />
          <Controller
            name="note"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                className={classes.grid12}
                label="Notes"
                placeholder="Misce notes"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                multiline
              />
            )}
          />
          <Controller
            name="releaseYear"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                onChange={(event) => field?.onChange?.(parseInt(event.target.value, 10))}
                className={classes.grid4}
                label="Release Year"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                required
                type="number"
              />
            )}
          />
          <Controller
            name="possessed"
            control={control}
            render={({ field }) => {
              return (
                <FormControlLabel
                  className={classes.grid4}
                  label="Possessed"
                  control={
                    <Switch
                      checked={field.value}
                      {...field}
                      onChange={(event) => {
                        field?.onChange(event)
                        setValue('ownedQuantity', event.target.value === 'false' ? 1 : 0)
                      }}
                    />
                  }
                />
              )
            }}
          />
          {watch('possessed') === true && (
            <Controller
              name="ownedQuantity"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  onChange={(event) => field?.onChange?.(parseInt(event.target.value, 10))}
                  className={classes.grid4}
                  label="Owned quantity"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  required
                  type="number"
                />
              )}
            />
          )}
          <Typography variant="h6" className={classes.grid12}>
            Content
          </Typography>
          <Controller
            name="content.minifigs"
            control={control}
            render={({ field }) => {
              return <SetMinifigs className={classes.grid12} {...field} />
            }}
          />
          <Controller
            name="content.box"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} className={classes.grid3} label="Box" isIndeterminate />
            )}
          />
          <Controller
            name="content.notice"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} className={classes.grid3} label="Notice" isIndeterminate />
            )}
          />
          <Controller
            name="content.bags"
            control={control}
            render={({ field }) => (
              <Checkbox {...field} className={classes.grid3} label="Bags" isIndeterminate />
            )}
          />
          <Controller
            name="content.partsQuantity"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                onChange={(event) => field?.onChange?.(parseInt(event.target.value, 10))}
                className={classes.grid3}
                value={field.value || ''}
                label="Parts quantity"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                type="number"
              />
            )}
          />
          <DisplayIfAuthenticated>
            <Typography variant="h6" className={classes.grid12}>
              Prices
            </Typography>
            <Controller
              name="prices.bought"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  onChange={(event) => field?.onChange?.(parseFloat(event.target.value))}
                  className={classes.grid4}
                  label="Bought"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  required
                  type="number"
                />
              )}
            />
            <Controller
              name="prices.storeValue"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  onChange={(event) => field?.onChange?.(parseFloat(event.target.value))}
                  className={classes.grid4}
                  label="Store Value"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  required
                  type="number"
                />
              )}
            />
            <Controller
              name="prices.marketValue"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  onChange={(event) => field?.onChange?.(parseFloat(event.target.value))}
                  className={classes.grid4}
                  label="Market Value"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  required
                  type="number"
                />
              )}
            />
          </DisplayIfAuthenticated>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={onClose} color="primary" loading={isLoading}>
            Cancel
          </LoadingButton>
          <LoadingButton type="submit" color="primary" variant="contained" loading={isLoading}>
            {editMode ? `Edit ${editionSetData.id}` : 'Add a set'}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SetFormModal
