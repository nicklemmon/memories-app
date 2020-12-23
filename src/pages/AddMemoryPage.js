import React from 'react'
import Helmet from 'react-helmet'
import { Card, CardContent } from 'src/components/Card'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import AddMemoryForm from '../components/AddMemoryForm'
import PageLayout from '../layouts/PageLayout'

export default function AddMemoryPage() {
  return (
    <PageLayout>
      <Helmet title="Add a Memory" />

      <PageHeading>Add a Memory</PageHeading>

      <PageContent>
        <Card isBrokenOut>
          <CardContent>
            <AddMemoryForm />
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  )
}
