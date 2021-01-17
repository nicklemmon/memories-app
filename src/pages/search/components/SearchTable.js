import React from 'react'
import { useQuery } from 'react-query'
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { getMemories } from 'src/helpers/api'
import {
  Alert,
  Card,
  CardContent,
  FormGroup,
  MaxWidth,
  PageLoader,
  ScreenReaderOnly,
} from 'src/components'
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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data: memories,
      autoResetGlobalFilter: false,
      initialState: {
        globalFilter: '',
      },
    },
    useGlobalFilter,
  )
  const handleFilterChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)
  const [filterValue, setFilterValue] = React.useState(state.globalFilter)
  const hasRows = Boolean(rows.length)

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
      <Card>
        <CardContent>
          <FormGroup
            label="Filter"
            type="text"
            id="filter"
            handleChange={e => {
              setFilterValue(e.target.value)
              handleFilterChange(e.target.value)
            }}
            value={filterValue}
            className="Table-filterField"
          />

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
              {hasRows ? (
                rows.map(row => {
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
                })
              ) : (
                <tr className="Table-row">
                  <td className="Table-cell" colSpan="100%">
                    No results found. <span aria-hidden="true">😔</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </MaxWidth>
  )
}
