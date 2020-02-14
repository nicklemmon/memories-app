import React from 'react'
import Helmet from 'react-helmet'
import PageHeading from '../components/PageHeading'
import PageContent from '../components/PageContent'
import FormLogin from '../components/FormLogin'
import PageLayout from '../layouts/PageLayout'

export default function LoginPage() {
  return (
    <PageLayout>
      <Helmet title="Log In" defer={false} />

      <PageHeading cy="heading-log-in">Log In</PageHeading>

      <PageContent>
        <FormLogin />
      </PageContent>
    </PageLayout>
  )
}
