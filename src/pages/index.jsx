import React from 'react'

import Hero from '../components/Hero.jsx'

function IndexPage( props ) {
  const { location } = props

  let successMsg = false

  //const hasSuccessMessage = props.location.state.hasSuccessMessage ? props.location.state.hasSuccessMessage : false
  if ( location.state && location.state.hasSuccessMessage ) {
    successMsg = true
  }

  return (
    <div>
      {/* <Hero hasSuccessMessage={ hasSuccessMessage }/> */}
      <Hero hasSuccessMessage={ successMsg } />
    </div>
  )
}

export default IndexPage
