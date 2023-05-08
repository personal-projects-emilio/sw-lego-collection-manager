import { AutocompleteProps as MuiAutocompleteProps, TextFieldProps } from '@mui/material'

import { Option } from 'types/common'

export type AutocompleteOption = Option & { added?: boolean }

export interface AutocompleteProps
  extends Omit<MuiAutocompleteProps<AutocompleteOption, boolean, boolean, boolean>, 'renderInput'> {
  creatable?: boolean
  label?: React.ReactNode
  TextFieldProps?: Partial<TextFieldProps>
}
