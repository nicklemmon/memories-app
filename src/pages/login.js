import React from 'react'
import Helmet from 'react-helmet'

import PageHeading from '../components/PageHeading'
import PageContent from '../components/PageContent'
import FormLogin from '../components/FormLogin'

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Log In" />

        <PageHeading content="Log In" cy="heading-log-in" />

        <PageContent>
          <FormLogin />
        </PageContent>
      </div>
    )
  }
}

export default LoginPage
