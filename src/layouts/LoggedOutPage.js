import React, { useEffect } from 'react'
import { useUser } from '../context'

export default function LoggedOutPage(props) {
  // eslint-disable-next-line
  const [state, dispatch] = useUser()

  useEffect(() => {
    dispatch({ type: 'LOGGED_OUT' })
    // eslint-disable-next-line
  }, [])

  return <>{props.children}</>
}
