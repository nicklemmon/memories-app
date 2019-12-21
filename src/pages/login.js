import React from 'react'
import Helmet from 'react-helmet'
import PageHeading from '../components/PageHeading'
import PageContent from '../components/PageContent'
import FormLogin from '../components/FormLogin'

export default function LoginPage() {
  return (
    <>
      <Helmet title="Log In" />

      <PageHeading cy="heading-log-in">Log In</PageHeading>

      <PageContent>
        <FormLogin />
      </PageContent>
    </>
  )
}
