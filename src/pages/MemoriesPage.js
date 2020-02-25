import React from 'react'
import Helmet from 'react-helmet'
import PageLayout from '../layouts/PageLayout'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import MemoryGrid from '../components/MemoryGrid'

export default function MemoriesPage() {
  return (
    <PageLayout>
      <Helmet title="Memories" defer={false} />

      <PageHeading>Memories</PageHeading>

      <PageContent>
        <MemoryGrid />
      </PageContent>
    </PageLayout>
  )
}
