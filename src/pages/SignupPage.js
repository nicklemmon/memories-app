import React from 'react'
import Helmet from 'react-helmet'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import FormSignup from '../components/FormSignup'
import PageLayout from '../layouts/PageLayout'

export default function SignupPage() {
  return (
    <PageLayout>
      <Helmet title="Sign Up" defer={false} />

      <PageHeading>Sign Up</PageHeading>

      <PageContent>
        <FormSignup />
      </PageContent>
    </PageLayout>
  )
}
