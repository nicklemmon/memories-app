import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useToast } from 'src/context'

export function Toast({ variant, children }) {
  // eslint-disable-next-line
  const [state, dispatch] = useToast()

  useEffect(() => {
    dispatch({ type: 'ADD_TOAST', variant, message: children })
    // eslint-disable-next-line
  }, [])

  return <></>
}

Toast.propTypes = {
  variant: PropTypes.oneOf(['error', 'success', 'attention']).isRequired,
  children: PropTypes.string.isRequired,
}
