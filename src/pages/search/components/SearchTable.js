import React from 'react'
import { useQuery } from 'react-query'
import { useTable } from 'react-table'
import { getMemories } from 'src/helpers/api'
import { Alert, MaxWidth, PageLoader, ScreenReaderOnly } from 'src/components'
import { formatMemories } from 'src/helpers/memories'
import './SearchTable.css'

export function SearchTable() {
  const { status, data } = useQuery('getMemories', getMemories)
  const memories = formatMemories(data)
  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Summary',
        accessor: 'summary',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
    ],
    [],
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: memories,
  })

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

  return (
    <MaxWidth size="lg">
      <table className="Table" {...getTableProps()}>
        <ScreenReaderOnly as="caption">Memories</ScreenReaderOnly>

        <thead className="Table-head">
          {headerGroups.map(headerGroup => {
            return (
              <tr className="Table-row" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  return (
                    <th className="Table-headCell" {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>

        <tbody className="Table-body" {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)

            return (
              <tr className="Table-row" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td className="Table-cell" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </MaxWidth>
  )
}
