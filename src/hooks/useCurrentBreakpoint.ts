import { useEffect, useState } from 'react'
import { singletonHook } from 'react-singleton-hook'
import { Breakpoint, useTheme } from '@mui/material'

// https://github.com/Light-Keeper/react-singleton-hook/issues/406#issuecomment-962282765
export function _useCurrentBreakpoint(): Breakpoint {
  const globalTheme = useTheme()

  const mediaQueries: [Breakpoint, string][] = globalTheme.breakpoints.keys.map(
    (key, index, breakpoints) => {
      let mediaQuery = ''
      if (index === breakpoints.length - 1) {
        mediaQuery = globalTheme.breakpoints.up(key)
      } else {
        mediaQuery = globalTheme.breakpoints.between(key, breakpoints[index + 1])
      }
      return [key, mediaQuery.replace(/^@media( ?)/m, '')]
    }
  )
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>(() => {
    const breakpoint = mediaQueries.find(([, mq]) => window.matchMedia(mq).matches)
    return breakpoint ? breakpoint[0] : 'xs'
  })

  useEffect(() => {
    function handleCurrentBreakpointChange(key: Breakpoint, e: MediaQueryListEvent) {
      if (e.matches) {
        setCurrentBreakpoint(key)
      }
    }

    const handlers: [string, (e: MediaQueryListEvent) => void][] = mediaQueries.map(
      ([key, mediaQuery]) => {
        const handler = (e: MediaQueryListEvent) => handleCurrentBreakpointChange(key, e)
        return [mediaQuery, handler]
      }
    )

    handlers.forEach(([mediaQuery, handler]) => {
      window.matchMedia(mediaQuery).addEventListener('change', handler)
    })

    return () => {
      handlers.forEach(([mediaQuery, handler]) => {
        window.matchMedia(mediaQuery).removeEventListener('change', handler)
      })
    }
  }, [mediaQueries])

  return currentBreakpoint
}

const useCurrentBreakpoint = singletonHook('xs', _useCurrentBreakpoint)

export { useCurrentBreakpoint }
