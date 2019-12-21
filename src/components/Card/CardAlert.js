import React from 'react'
import Alert from '../Alert'

export default function CardAlert(props) {
  const { type, children, cy } = props

  return (
    <Alert className="Card-alert" type={type} data-cy={cy}>
      {children}
    </Alert>
  )
}
