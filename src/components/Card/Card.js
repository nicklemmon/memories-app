import React from 'react'
import classNames from 'classnames'
import './Card.css'

export default function Card(props) {
  const { className, isBrokenOut, children } = props

  return (
    <div className={classNames('Card', isBrokenOut && 'Card--brokenOut', className)} role="region">
      {children}
    </div>
  )
}
