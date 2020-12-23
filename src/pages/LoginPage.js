import React from 'react'
import Helmet from 'react-helmet'
import { PageContent, PageHeading } from 'src/components'
import { LoginForm } from 'src/components/LoginForm'
import { PageLayout } from 'src/layouts'

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
