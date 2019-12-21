import React from 'react'
import Helmet from 'react-helmet'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import MemoryGrid from '../components/MemoryGrid'

export default function MemoriesPage() {
  return (
    <>
      <Helmet title="Memories" />

      <PageHeading>Memories</PageHeading>

      <PageContent>
        <MemoryGrid />
      </PageContent>
    </>
  )
}
