import React from 'react'

import { UserContext } from './UserContext.js'

function User( props ) {
  return (
    <UserContext.Consumer>
      { user => (
        <p>{ user.username }</p>
      ) }
    </UserContext.Consumer>
  )
}

export default User
