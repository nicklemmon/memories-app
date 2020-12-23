import React from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import { logIn } from 'src/helpers/api'
import { useToast } from 'src/context'
import { Card, CardContent, Button, ButtonWrapper, FormGroup, PageLoader } from 'src/components'

const initialState = {
  username: '',
  password: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'VALUE_CHANGE': {
      const { name, value } = action

      return {
        ...state,
        [name]: value,
      }
    }

    default: {
      throw new Error(`${action.type} is not supported by LoginForm.`)
    }
  }
}

export function LoginForm() {
  const history = useHistory()
  const [state, dispatch] = React.useReducer(reducer, initialState)
  // eslint-disable-next-line
  const [toastState, toastDispatch] = useToast()
  const { username, password } = state
  const [handleLogin, { status }] = useMutation(() => logIn({ username, password }), {
    onSuccess: () => {
      history.push('/')
      toastDispatch({
        type: 'ADD_TOAST',
        variant: 'success',
        message: `Logged in as ${username}`,
      })
    },
    onError: () => {
      toastDispatch({
        type: 'ADD_TOAST',
        variant: 'error',
        message: 'Login failed - please try again',
      })
    },
  })

  function handleChange(e) {
    return dispatch({ type: 'VALUE_CHANGE', name: e.target.name, value: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    return handleLogin()
  }

  if (status === 'loading') return <PageLoader />

  return (
    <Card isBrokenOut>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label="Username"
            type="text"
            id="username"
            handleChange={handleChange}
            value={username}
          />

          <FormGroup
            label="Password"
            type="password"
            id="password"
            handleChange={handleChange}
            value={password}
          />

          <ButtonWrapper>
            <Button variant="primary" fullWidth type="submit">
              Log In
            </Button>
          </ButtonWrapper>
        </form>
      </CardContent>
    </Card>
  )
}
