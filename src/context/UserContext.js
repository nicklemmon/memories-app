import React, { createContext, useReducer, useContext } from 'react'

// See: https://kentcdodds.com/blog/how-to-use-react-context-effectively

const UserStateContext = createContext()
const UserDispatchContext = createContext()

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
  permissions: {},
}

function userReducer(state, action) {
  switch (action.type) {
    case 'LOADING': {
      return { isLoading: true }
    }
    case 'LOG_IN': {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.user,
        permissions: action.permissions,
      }
    }
    case 'LOG_OUT': {
      return { ...state, isLoading: false, isLoggedIn: false, user: null, permissions: {} }
    }
    case 'ERROR': {
      return { ...state, isLoading: false, hasError: true }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider(props) {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{props.children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

function useUserState() {
  const context = useContext(UserStateContext)

  if (context === undefined) throw new Error('useUserState must be used within an AppProvider')

  return context
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext)

  if (context === undefined) throw new Error('useUserDispatch must be used within an AppProvider')

  return context
}

function useUser() {
  return [useUserState(), useUserDispatch()]
}

export { UserProvider, useUser }
