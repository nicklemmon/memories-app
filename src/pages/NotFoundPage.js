import React from 'react'
import Helmet from 'react-helmet'
import PageHeading from '../components/PageHeading'
import PageContent from '../components/PageContent'
import Alert from '../components/Alert'
import PageLayout from '../layouts/PageLayout'

export default function NotFoundPage() {
  return (
    <PageLayout>
      <Helmet title="404 Page Not Found" />

      <PageHeading>{'404 :('}</PageHeading>

      <PageContent maxWidth="sm">
        <Alert type="attention">
          <p>D'oh! No page for this URL.</p>
        </Alert>
      </PageContent>
    </PageLayout>
  )
}
