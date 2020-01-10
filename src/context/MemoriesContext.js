import React, { createContext, useReducer, useContext } from 'react'

// See: https://kentcdodds.com/blog/how-to-use-react-context-effectively

const MemoriesStateContext = createContext()
const MemoriesDispatchContext = createContext()

function memoriesReducer(state, action) {
  switch (action.type) {
    case 'LOADING': {
      return { isLoading: true, hasErrorMessage: false }
    }
    case 'SUCCESS': {
      return { isLoading: false, payload: action.payload, hasErrorMessage: false }
    }
    case 'ERROR': {
      return { isLoading: false, payload: action.payload, hasErrorMessage: true }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function MemoriesProvider(props) {
  const [state, dispatch] = useReducer(memoriesReducer, { isLoading: false, payload: undefined })

  return (
    <MemoriesStateContext.Provider value={state}>
      <MemoriesDispatchContext.Provider value={dispatch}>
        {props.children}
      </MemoriesDispatchContext.Provider>
    </MemoriesStateContext.Provider>
  )
}

function useMemoriesState() {
  const context = useContext(MemoriesStateContext)

  if (context === undefined)
    throw new Error('useMemoriesState must be used within an MemoriesProvider')

  return context
}

function useMemoriesDispatch() {
  const context = useContext(MemoriesDispatchContext)

  if (context === undefined) {
    throw new Error('useMemoriesDispatch must be used within a MemoriesProvider')
  }

  return context
}

function useMemories() {
  return [useMemoriesState(), useMemoriesDispatch()]
}

export { MemoriesProvider, useMemories }
