import React, { createContext, useReducer, useContext } from 'react'

const ToastStateContext = createContext()
const ToastDispatchContext = createContext()

const initialState = {
  toasts: [],
}

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD_TOAST': {
      return { toasts: [...state.toasts, { message: action.message, variant: action.variant }] }
    }
    case 'REMOVE_TOAST': {
      const nextToasts = state.toasts
      delete nextToasts[action.index]

      return { toasts: nextToasts.filter(Boolean) }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function ToastProvider(props) {
  const [state, dispatch] = useReducer(toastReducer, initialState)

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {props.children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  )
}

function useToastState() {
  const context = useContext(ToastStateContext)

  if (context === undefined) throw new Error('useToastState must be used within an AppProvider')

  return context
}

function useToastDispatch() {
  const context = useContext(ToastDispatchContext)

  if (context === undefined) throw new Error('useToastDispatch must be used within an AppProvider')

  return context
}

function useToast() {
  return [useToastState(), useToastDispatch()]
}

export { ToastProvider, useToast }
