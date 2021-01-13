import React from 'react'
import { useQuery } from 'react-query'
import { getMemories } from 'src/helpers/api'
import { Alert, MaxWidth, PageLoader, ScreenReaderOnly } from 'src/components'
import { formatMemories } from 'src/helpers/memories'
import './SearchTable.css'

export function SearchTable() {
  const { status, data } = useQuery('getMemories', getMemories)

  if (status === 'loading') return <PageLoader />

  if (status === 'error') {
    return (
      <MaxWidth size="md">
        <Alert variant="attention">
          <p>Sorry! Something went wrong. Please try again later.</p>
        </Alert>
      </MaxWidth>
    )
  }

  if (data && data.length === 0) {
    return (
      <MaxWidth size="md">
        <Alert variant="info">
          <p>No memories available.</p>
        </Alert>
      </MaxWidth>
    )
  }

  const memories = formatMemories(data)

  return (
    <table className="Table">
      <ScreenReaderOnly as="caption">Memories</ScreenReaderOnly>

      <thead className="Table-head">
        <tr className="Table-row">
          <th className="Table-headCell">Title</th>

          <th className="Table-headCell">Summary</th>

          <th className="Table-headCell">Date</th>
        </tr>
      </thead>

      <tbody className="Table-body">
        {memories.map(memory => {
          return (
            <tr className="Table-row" key={memory.objectId}>
              <td className="Table-cell">{memory.title}</td>

              <td className="Table-cell">{memory.summary}</td>

              <td className="Table-cell">{memory.date}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
