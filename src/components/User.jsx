import React from 'react'

import { UserContext } from './UserContext.js'

function User( props ) {
  return (
    <UserContext.Consumer>
      { user => (
        <p>Welcome, { user.username }!</p>
      ) }
    </UserContext.Consumer>
  )
}

export default User
