import React from 'react'
import classNames from 'classnames'
import './Heading.css'

export function Heading(props) {
  const { level, children, alignment, className } = props

  return (
    <div
      className={classNames(`Heading Heading--${level}`, className)}
      role="heading"
      aria-level={level}
      style={{ textAlign: alignment }}
    >
      {children}
    </div>
  )
}
