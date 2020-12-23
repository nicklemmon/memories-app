import React from 'react'
import Helmet from 'react-helmet'
import { Card, CardContent, PageContent, PageHeading } from 'src/components'
import { AddMemoryForm } from 'src/components/AddMemoryForm'
import { PageLayout } from 'src/layouts'

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
