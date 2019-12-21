import React from 'react'
import Helmet from 'react-helmet'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import FormAddMemory from '../components/FormAddMemory'

export default function AddMemoryPage() {
  return (
    <>
      <Helmet title="Add a Memory" />

      <PageHeading>Add a Memory</PageHeading>

      <PageContent>
        <FormAddMemory />
      </PageContent>
    </>
  )
}
