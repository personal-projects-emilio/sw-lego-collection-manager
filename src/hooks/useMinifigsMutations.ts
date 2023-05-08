import { useMutation } from '@tanstack/react-query'

import {
  invalidateMinifigsQuery,
  mutateMinifigs,
  setMinifigsQueryData,
  useMinifigsQuery,
} from 'api/minifigs'
import { useAuth } from 'providers'
import { Minifig, MinifigsList } from 'types/minifigs'
import { assert } from 'utils/typescript'

export const useMinifigsMutations = () => {
  const { data: minifigsList } = useMinifigsQuery()
  const { idToken } = useAuth()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: MinifigsList) => mutateMinifigs(data),
    onSuccess: () => invalidateMinifigsQuery(),
  })

  const toggleMinifigOwned = async (minifigId: Minifig['id']) => {
    assert(minifigsList, 'No minifigs list found')

    const indexOfMinifig = minifigsList.find(({ id }) => id === minifigId)
    if (!indexOfMinifig) return console.warn(`No minifig with id ${minifigId}`)

    const updatedMinifigsList = minifigsList.map((el) =>
      el.id === minifigId ? { ...el, possessed: !el.possessed } : el
    )

    if (!idToken) return setMinifigsQueryData(updatedMinifigsList)

    mutate(updatedMinifigsList, {
      onError: (err) => console.error('Unable to toggle minifig owned', err),
    })
  }

  const addMinifig = async (minifig: Minifig) => {
    assert(minifigsList, 'No minifigs list found')

    const updatedMinifigsList = minifigsList
      .concat(minifig)
      .sort((a, b) => a.id.localeCompare(b.id))

    if (!idToken) return setMinifigsQueryData(updatedMinifigsList)

    await mutate(updatedMinifigsList, {
      onError: (err) => console.error('Unable to add the minifig', err),
    })
  }

  const editMinifig = async (minifig: Minifig) => {
    assert(minifigsList, 'No minifigs list found')

    const updatedMinifigsList = minifigsList
      .map((existingMinifig) => (existingMinifig.id === minifig.id ? minifig : existingMinifig))
      .sort((a, b) => a.id.localeCompare(b.id))

    if (!idToken) return setMinifigsQueryData(updatedMinifigsList)

    await mutate(updatedMinifigsList, {
      onError: (err) => console.error('Unable to edit the minifig', err),
    })
  }

  const deleteMinifig = async (minifigId: Minifig['id']) => {
    assert(minifigsList, 'No minifigs list found')

    const indexOfMinifig = minifigsList.findIndex((minifig) => minifig.id === minifigId)
    if (indexOfMinifig === -1) return console.warn(`No minifig with id ${minifigId}`)

    const updatedMinifigsList = minifigsList.filter(({ id }) => id !== minifigId)

    if (!idToken) return setMinifigsQueryData(updatedMinifigsList)

    await mutate(updatedMinifigsList, {
      onError: (err) => console.error('Unable to delete the minifig', err),
    })
  }

  return {
    toggleMinifigOwned,
    deleteMinifig,
    addMinifig,
    editMinifig,
    isLoading,
  }
}

export default useMinifigsMutations
