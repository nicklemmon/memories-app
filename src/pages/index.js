import React from 'react'

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
    <div>
      <Hero hasSuccessMessage={successMsg} userName={userName} />
    </div>
  )
}

export default IndexPage
