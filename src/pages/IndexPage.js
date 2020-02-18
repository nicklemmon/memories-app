import React from 'react'
import PageLayout from '../layouts/PageLayout'
import Hero from '../components/Hero'

function IndexPage(props) {
  const { location } = props

  let successMsg = false
  let userName

  //const hasSuccessMessage = props.location.state.hasSuccessMessage ? props.location.state.hasSuccessMessage : false
  if (location.state && location.state.hasSuccessMessage) {
    successMsg = true
    userName = location.state.userName
  }

  return (
    <PageLayout>
      <Hero hasSuccessMessage={successMsg} userName={userName} />

      <p>Boo</p>
    </PageLayout>
  )
}

export default IndexPage
