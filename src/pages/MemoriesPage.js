import React from 'react'
import Helmet from 'react-helmet'
import { PageContent, PageHeading } from 'src/components'
import { MemoryGrid } from 'src/components/MemoryGrid'
import { PageLayout } from 'src/layouts'
import { MemoriesProvider } from 'src/context/MemoriesContext'

export default function MemoriesPage() {
  return (
    <PageLayout>
      <Helmet title="Memories" />

      <PageHeading>Memories</PageHeading>

      <PageContent>
        <MemoriesProvider>
          <MemoryGrid />
        </MemoriesProvider>
      </PageContent>
    </PageLayout>
  )
}
