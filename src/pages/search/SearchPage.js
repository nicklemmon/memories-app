import React from 'react'
import Helmet from 'react-helmet'
import { PageContent, PageHeading } from 'src/components'
import { PageLayout } from 'src/layouts'
import { SearchTable } from './components'

export function SearchPage() {
  return (
    <PageLayout>
      <Helmet title="Search Memories" />

      <PageHeading>Search Memories</PageHeading>

      <PageContent>
        <SearchTable />
      </PageContent>
    </PageLayout>
  )
}
