import { Breakpoint } from '@mui/material'

import { useCurrentBreakpoint } from './useCurrentBreakpoint'

const useBreakpointValues = <T>(values: Record<Breakpoint, T>): T => {
  const currentBreakpoint = useCurrentBreakpoint()
  return values[currentBreakpoint]
}

export default useBreakpointValues
