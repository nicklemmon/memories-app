import React, { useEffect } from 'react'
import Parse from 'parse'
import { useUser } from '../context'

export default function LoggedInPage(props) {
  // eslint-disable-next-line
  const [state, dispatch] = useUser()

  useEffect(() => {
    const user = Parse.User.current()
    const permissions = user.attributes.ACL.permissionsById[user.id]

    dispatch({
      type: 'LOGGED_IN',
      user,
      permissions,
    })
    // eslint-disable-next-line
  }, [])

  return <>{props.children}</>
}
