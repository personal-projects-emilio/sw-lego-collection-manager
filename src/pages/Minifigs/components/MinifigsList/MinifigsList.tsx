import { FC, useLayoutEffect, useMemo, useRef } from 'react'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

import { useMinifigsQuery } from 'api/minifigs'
import useBreakpointValues from 'hooks/useBreakpointValues'
import useMinifigsFilters from 'pages/Minifigs/hooks/useMinifigsFilters'
import { reduceInArrayOfNElements } from 'utils/array'
import { getFilteredMinifigsList } from 'utils/minifigs'

import MinifigCard from './MinifigCard'

export const Minifigs: FC = () => {
  const { data, isLoading, error } = useMinifigsQuery()
  const parentRef = useRef<HTMLDivElement>(null)
  const parentOffsetRef = useRef(0)
  const numberOfColumns = useBreakpointValues({
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  })
  const { filtersValues } = useMinifigsFilters()
  const gridFilteredData = useMemo(() => {
    const filteredList = getFilteredMinifigsList(data ?? [], filtersValues)
    return reduceInArrayOfNElements(filteredList, numberOfColumns)
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

  if (isLoading) return <>{'Loading...'}</>

  if (error || !gridFilteredData) return <>{'An error has occurred'}</>

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
            const nbOfMinifigs = gridFilteredData[virtualRow.index].length
            return Array.from(Array(nbOfMinifigs).keys()).map((columnIndex) => {
              const minifig = gridFilteredData[virtualRow.index][columnIndex]
              return (
                <div
                  key={`${virtualRow.key}-${columnIndex}`}
                  data-index={`${virtualRow.key}-${columnIndex}`}
                  ref={virtualizer.measureElement}
                >
                  <MinifigCard {...minifig} />
                </div>
              )
            })
          })}
        </div>
      </div>
    </div>
  )
}

export default Minifigs
