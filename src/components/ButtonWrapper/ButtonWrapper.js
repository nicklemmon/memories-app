import React from 'react'
import classNames from 'classnames'
import './ButtonWrapper.css'

export function ButtonWrapper(props) {
  const { className, children } = props

  return <div className={classNames('ButtonWrapper', className)}>{children}</div>
}
