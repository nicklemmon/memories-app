import React, { useState } from 'react'
import Parse from 'parse'
import { Redirect } from 'react-router-dom'
import FormWrapper from './FormWrapper'
import FormGroup from './FormGroup'
import ButtonWrapper from './ButtonWrapper'
import Button from './Button'
import PageLoader from './PageLoader'
import ActionLink from './ActionLink'
import { useUser } from '../context'

export default function FormLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userState, userDispatch] = useUser()
  const { isLoggedIn, isLoading } = userState

  const handleSubmit = e => {
    e.preventDefault()

    userDispatch({ type: 'LOADING' })

    Parse.User.logIn(username, password)
      .then(() => userDispatch({ type: 'LOGGED_IN' }))
      .catch(() => userDispatch({ type: 'ERROR' }))
  }

  if (isLoading) return <PageLoader />

  return (
    <>
      {isLoggedIn ? (
        <Redirect
          to={{
            pathname: '/',
            state: {
              hasSuccessMessage: true,
              userName: username,
            },
          }}
        />
      ) : (
        <FormWrapper
          handleSubmit={handleSubmit}
          footerContent={
            <ActionLink cy="link-sign-up" style={{ float: 'right' }} to="/signup">
              Sign Up
            </ActionLink>
          }
        >
          <FormGroup
            label="Username"
            type="text"
            id="username"
            cy="form-group-username"
            handleChange={e => setUsername(e.target.value)}
            value={username}
          />

          <FormGroup
            label="Password"
            type="password"
            id="password"
            cy="form-group-password"
            handleChange={e => setPassword(e.target.value)}
            value={password}
          />

          <ButtonWrapper>
            <Button variant="primary" fullWidth="true" cy="button-log-in">
              Log In
            </Button>
          </ButtonWrapper>
        </FormWrapper>
      )}
    </>
  )
}
