import React from 'react'
import Helmet from 'react-helmet'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import FormAddMemory from '../components/FormAddMemory'
import PageLayout from '../layouts/PageLayout'

export default function AddMemoryPage() {
  return (
    <PageLayout>
      <Helmet title="Add a Memory" defer={false} />

      <PageHeading>Add a Memory</PageHeading>

      <PageContent>
        <FormAddMemory />
      </PageContent>
    </PageLayout>
  )
}
