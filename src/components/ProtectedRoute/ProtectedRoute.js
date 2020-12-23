import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Parse from 'parse'

export function ProtectedRoute(props) {
  const { path, children } = props

  return (
    <Route
      path={path}
      render={() => {
        if (Parse.User.current()) {
          return children
        }

        return <Redirect to={{ pathname: '/login' }} />
      }}
    />
  )
}
