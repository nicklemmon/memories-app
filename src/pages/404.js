import React from 'react'
import Helmet from 'react-helmet'

import PageHeading from '../components/PageHeading'
import PageContent from '../components/PageContent'
import Alert from '../components/Alert'

const NotFoundPage = () => (
  <>
    <Helmet title="404 Page Not Found" />

    <PageHeading content="404 :(" />

    <PageContent maxWidth="sm">
      <Alert type="attention" content="D'oh! No page for this URL." />
    </PageContent>
  </>
)

export default NotFoundPage
