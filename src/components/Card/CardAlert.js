import React from 'react'
import Alert from '../Alert'

export default function CardAlert(props) {
  const { variant, children, cy } = props

  return (
    <Alert className="Card-alert" variant={variant} data-cy={cy}>
      {children}
    </Alert>
  )
}
