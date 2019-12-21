import React from 'react'
import Helmet from 'react-helmet'

import PageContent from '../PageContent'
import Heading from '../Heading'

class LoginPage extends React.Component {
  render() {
    return (
      <PageContent>
        <Helmet title="Log Out" />

        <Heading level="1" content="Log Out" alignment="center" />
      </PageContent>
    )
  }
}

export default LoginPage
