import React from 'react'
import Helmet from 'react-helmet'

import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import FormSignup from '../components/FormSignup'

class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Sign Up" />

        <PageHeading content="Sign Up" />

        <PageContent>
          <FormSignup />
        </PageContent>
      </div>
    )
  }
}

export default SignupPage
