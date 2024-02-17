import { FC, useLayoutEffect, useMemo, useRef } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

import { useSetsQuery } from 'api/sets'
import useBreakpointValues from 'hooks/useBreakpointValues'
import useSetsFilters from 'pages/Sets/hooks/useSetsFilters'
import { reduceInArrayOfNElements } from 'utils/array'
import { getFilteredSetsList } from 'utils/sets'

import SetCard from './components/SetCard'

export const Sets: FC = () => {
  const { data, isLoading, error } = useSetsQuery()
  const parentRef = useRef<HTMLDivElement>(null)
  const parentOffsetRef = useRef(0)
  const numberOfColumns = useBreakpointValues({
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 3,
  })
  const { filtersValues, handleResetFilters, filterPreloaded } = useSetsFilters()
  const gridFilteredData = useMemo(() => {
    const filteredList = getFilteredSetsList(data ?? [], filtersValues)
    return reduceInArrayOfNElements(filteredList ?? [], numberOfColumns)
  }, [data, numberOfColumns, filtersValues])

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0
  }, [])

  const virtualizer = useWindowVirtualizer({
    count: gridFilteredData?.length ?? 0,
    estimateSize: () => 550,
    scrollMargin: parentOffsetRef.current,
  })
  const items = virtualizer.getVirtualItems()

  if (isLoading || !filterPreloaded) return <>{'Loading...'}</>

  if (error || !gridFilteredData) return <>{'An error has occurred'}</>

  if (gridFilteredData[0].length === 0)
    return (
      <Box
        sx={(theme) => ({
          padding: theme.spacing(3),
          display: 'grid',
          gap: theme.spacing(2),
          justifyContent: 'center',
        })}
      >
        <Typography>There are no sets with these filters</Typography>
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </Box>
    )
  return (
    <div ref={parentRef}>
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
            padding: 16,
            gap: 8,
            transform: `translateY(${items[0].start - virtualizer.options.scrollMargin}px)`,
            position: 'absolute',
            width: '100%',
          }}
        >
          {items.map((virtualRow) => {
            const nbOfSets = gridFilteredData[virtualRow.index].length
            return Array.from(Array(nbOfSets).keys()).map((columnIndex) => {
              const set = gridFilteredData[virtualRow.index][columnIndex]
              return (
                <div
                  key={`${virtualRow.key}-${columnIndex}`}
                  data-index={`${virtualRow.key}-${columnIndex}`}
                  ref={virtualizer.measureElement}
                >
                  <SetCard {...set} />
                </div>
              )
            })
          })}
        </div>
      </div>
    </div>
  )
}

export default Sets
