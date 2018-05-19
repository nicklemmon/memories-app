import React from 'react'

import PageHeading from '../components/PageHeading.jsx'
import Content from '../components/Content.jsx'
import Alert from '../components/Alert.jsx'

const NotFoundPage = () => (
  <div>
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
