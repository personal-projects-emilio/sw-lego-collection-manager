import api from 'api'
import { invalidateMinifigsQuery, useMinifigsQuery } from 'api/minifigs'
import { useAuth } from 'providers'
import { Minifig } from 'types/minifigs'

export const useMinifigsMutations = () => {
  const { data: minifigsList } = useMinifigsQuery()
  const { idToken } = useAuth()

  const toggleMinifigOwned = async (minifigId: Minifig['id']) => {
    if (!idToken || !minifigsList) return
    const indexOfMinifig = minifigsList.findIndex(({ id }) => id === minifigId)
    if (indexOfMinifig === -1) return

    api
      .patch(`minifigs/${indexOfMinifig}.json`, {
        possessed: !minifigsList[indexOfMinifig].possessed,
      })
      .then(invalidateMinifigsQuery)
      .catch((err) => console.error('Unable to toggle minifig owned', err))
  }

  const deleteMinifig = async (minifigId: Minifig['id']) => {
    if (!idToken || !minifigsList) return
    const indexOfMinifig = minifigsList.findIndex((minifig) => minifig.id === minifigId)
    if (indexOfMinifig === -1) return

    const updatedMinifigsList = minifigsList.filter(({ id }) => id !== minifigId)

    api
      .put(`minifigs.json`, updatedMinifigsList)
      .then(invalidateMinifigsQuery)
      .catch((err) => console.error('Unable to delete minifig', err))
  }

  return {
    toggleMinifigOwned,
    deleteMinifig,
  }
}

export default useMinifigsMutations
