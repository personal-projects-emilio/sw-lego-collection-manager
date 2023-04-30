import { useMatches } from '@tanstack/router'
import { RoutesPath } from 'routes'

// TODO: find a better solution where there is more doc on tan stack router
export const useCurrentRoute = (routes: RoutesPath[]) => {
  const matches = useMatches().filter((el) => el.id !== '__root__')
  return routes.reduce<(typeof matches)[number] | undefined>((acc, route) => {
    const currentRoute = matches.find((el) => el.id === route)
    if (currentRoute) {
      return currentRoute
    }
    return acc
  }, undefined)
}

export default useCurrentRoute
