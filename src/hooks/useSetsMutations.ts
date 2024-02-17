import { useMutation } from '@tanstack/react-query'

import { invalidateSetsQuery, mutateSets, setSetsQueryData, useSetsQuery } from 'api/sets'
import { useAuth } from 'providers'
import { Set, SetsList } from 'types/sets'
import { assert } from 'utils/typescript'

export const useSetsMutation = () => {
  const { data: setsList } = useSetsQuery()
  const { idToken } = useAuth()

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: SetsList) => await mutateSets(data),
    onSuccess: () => invalidateSetsQuery(),
  })

  const addSet = async (set: Set) => {
    assert(setsList, 'No sets list found')

    const updatedsetsList = setsList
      .concat(set)
      .sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true }))

    if (!idToken) return setSetsQueryData(updatedsetsList)

    await mutateAsync(updatedsetsList, {
      onError: (err) => console.error('Unable to add the set', err),
    })
  }

  const editSet = async (set: Set) => {
    assert(setsList, 'No sets list found')

    const updatedSetsList = setsList.map((existingSet) =>
      existingSet.id === set.id ? set : existingSet
    )
    // .sort((a, b) => String(a.id).localeCompare(String(b.id), undefined, { numeric: true }))

    if (!idToken) return setSetsQueryData(updatedSetsList)

    await mutateAsync(updatedSetsList, {
      onError: (err) => console.error('Unable to edit the set', err),
    })
  }

  const toggleSetPossession = async (setId: Set['id']) => {
    assert(setsList, 'No sets list found')

    const updatedSetsList = setsList.map((existingSet) =>
      existingSet.id === setId ? { ...existingSet, possessed: !existingSet.possessed } : existingSet
    )

    if (!idToken) return setSetsQueryData(updatedSetsList)

    await mutateAsync(updatedSetsList, {
      onError: (err) => console.error('Unable to toggle set owned', err),
    })
  }

  const deleteSet = async (setId: Set['id']) => {
    assert(setsList, 'No sets list found')

    const indexOfSet = setsList.findIndex((set) => set.id === setId)
    if (indexOfSet === -1) return console.warn(`No set with id ${setId}`)

    const updatedsetsList = setsList.filter(({ id }) => String(id) !== String(setId))

    if (!idToken) return setSetsQueryData(updatedsetsList)

    await mutateAsync(updatedsetsList, {
      onError: (err) => console.error('Unable to delete the set', err),
    })
  }

  // const editSetsList = async (newSetsList: Set[]) => {
  //   assert(setsList, 'No sets list found')
  //   if (!idToken) return setSetsQueryData(newSetsList)
  //   await mutate(newSetsList, {
  //     onError: (err) => console.error('Unable to edit sets list', err),
  //   })
  // }

  return {
    deleteSet,
    addSet,
    editSet,
    isLoading,
    toggleSetPossession,
    // editSetsList,
  }
}

export default useSetsMutation
