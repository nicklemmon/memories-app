import React from 'react'
import Helmet from 'react-helmet'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import MemoryGrid from '../components/MemoryGrid'
import LoggedInPage from '../layouts/LoggedInPage'
import { MemoriesProvider } from '../context/MemoriesContext'

export default function MemoriesPage() {
  return (
    <LoggedInPage>
      <Helmet title="Memories" />

      <PageHeading>Memories</PageHeading>

      <PageContent>
        <MemoriesProvider>
          <MemoryGrid />
        </MemoriesProvider>
      </PageContent>
    </LoggedInPage>
  )
}
