import React from 'react'
import Helmet from 'react-helmet'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import MemoryGrid from '../components/MemoryGrid'
import PageLayout from '../layouts/PageLayout'
import { MemoriesProvider } from '../context/MemoriesContext'

export default function MemoriesPage() {
  return (
    <PageLayout>
      <Helmet title="Memories" defer={false} />

      <PageHeading>Memories</PageHeading>

      <PageContent>
        <MemoriesProvider>
          <MemoryGrid />
        </MemoriesProvider>
      </PageContent>
    </PageLayout>
  )
}
