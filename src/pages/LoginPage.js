import React from 'react'
import Helmet from 'react-helmet'
import PageHeading from '../components/PageHeading'
import PageContent from '../components/PageContent'
import LoginForm from '../components/LoginForm'
import PageLayout from '../layouts/PageLayout'

export default function LoginPage() {
  return (
    <PageLayout>
      <Helmet title="Log In" />

      <PageHeading cy="heading-log-in">Log In</PageHeading>

      <PageContent>
        <LoginForm />
      </PageContent>
    </PageLayout>
  )
}
