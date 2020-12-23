import React from 'react'
import Helmet from 'react-helmet'
import { Alert, PageHeading, PageContent } from 'src/components'
import { PageLayout } from 'src/layouts'

export default function NotFoundPage() {
  return (
    <PageLayout>
      <Helmet title="404 Page Not Found" />

      <PageHeading>{'404 :('}</PageHeading>

      <PageContent maxWidth="sm">
        <Alert variant="attention">
          <p>D'oh! No page for this URL.</p>
        </Alert>
      </PageContent>
    </PageLayout>
  )
}
