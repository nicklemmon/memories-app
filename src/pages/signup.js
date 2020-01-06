import React from 'react'
import Helmet from 'react-helmet'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import FormSignup from '../components/FormSignup'
import LoggedOutPage from '../layouts/LoggedOutPage'

export default function SignupPage() {
  return (
    <LoggedOutPage>
      <Helmet title="Sign Up" />

      <PageHeading>Sign Up</PageHeading>

      <PageContent>
        <FormSignup />
      </PageContent>
    </LoggedOutPage>
  )
}
