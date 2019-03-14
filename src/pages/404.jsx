import React from 'react'
import Helmet from 'react-helmet'

import PageHeading from '../components/PageHeading'
import Content from '../components/Content'
import Alert from '../components/Alert'

const NotFoundPage = () => (
  <div>
    <Helmet title='404 Page Not Found'/>

    <PageHeading content='404 :('/>

    <Content maxWidth='sm'>
      <Alert
        type="attention"
        content="D'oh! No page for this URL."
      />
    </Content>
  </div>
)

export default NotFoundPage
