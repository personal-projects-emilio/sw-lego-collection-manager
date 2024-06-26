// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { forwardRef, useCallback, useEffect, useState } from 'react'
import { Autocomplete as MuiAutocomplete, createFilterOptions } from '@mui/material'
import TextField from '@mui/material/TextField'

import { AutocompleteOption, AutocompleteProps } from './types'

const filter = createFilterOptions<AutocompleteOption>()

const asNoValue = (
  option: AutocompleteOption | AutocompleteOption[] | null | undefined
): boolean => (option === null || (Array.isArray(option) && option.length === 0) ? true : false)

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ multiple, options, creatable, label, value, TextFieldProps, onChange, ...rest }, ref) => {
    const [optionValue, setOptionValue] = useState<
      AutocompleteOption | AutocompleteOption[] | null | undefined
    >(multiple ? [] : null)

    useEffect(() => {
      let newValue = null
      if (Array.isArray(value) && multiple && !creatable) {
        newValue = options.filter((option) => value.includes(option.value))
      }
      if (Array.isArray(value) && multiple && creatable) {
        newValue = value.map((value) => ({
          value,
          label: value,
          added: !options.map((option) => option.value).includes(value),
        }))
      }
      if (value && !Array.isArray(value) && !multiple) {
        newValue = options.find((option) => option.value === value)
        if (newValue === undefined && creatable) {
          newValue = {
            label: value,
            value,
            added: true,
          }
        }
        if (newValue === undefined && !creatable) {
          newValue = null
        }
      }
      setOptionValue(newValue)
    }, [value, options, multiple, creatable])

    const onChangeHandler = useCallback(
      (newValue: AutocompleteOption | AutocompleteOption[] | null | undefined) => {
        setOptionValue(newValue)
        if (Array.isArray(newValue)) {
          onChange(newValue.map((option) => option.value))
        } else {
          onChange(newValue ? newValue.value : null)
        }
      },
      [setOptionValue, onChange]
    )

    const getOptiondDisabled = useCallback(
      (option: AutocompleteOption) => {
        if (!value) return false
        if (Array.isArray(value)) {
          return value.includes(option.value)
        }
        return value === option.value
      },
      [value]
    )

    return (
      <MuiAutocomplete
        {...rest}
        multiple={multiple}
        options={options}
        value={optionValue}
        autoHighlight
        freeSolo={creatable}
        clearOnBlur={creatable}
        handleHomeEndKeys={creatable}
        openOnFocus
        onChange={(_e, value) => {
          onChangeHandler(value)
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          const trimedInputValue = params.inputValue.trim()
          // Suggest the creation of a new value only if it does not exist in the options or newly created values
          if (
            trimedInputValue !== '' &&
            creatable &&
            ((Array.isArray(optionValue) &&
              !optionValue.find((option) => option.value === trimedInputValue) &&
              !options.find((option) => option.value === trimedInputValue)) ||
              !Array.isArray(optionValue))
          ) {
            filtered.push({
              value: trimedInputValue,
              label: `Add "${trimedInputValue}"`,
              added: true,
            })
          }
          return filtered
        }}
        getOptionDisabled={getOptiondDisabled}
        renderInput={(params) => (
          <TextField
            {...params}
            ref={ref}
            variant="outlined"
            label={label}
            {...TextFieldProps}
            InputLabelProps={{
              ...TextFieldProps?.InputLabelProps,
              shrink: true,
            }}
            placeholder={asNoValue(optionValue) ? TextFieldProps?.placeholder : undefined}
          />
        )}
      />
    )
  }
)

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete
