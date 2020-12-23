import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import './ActionLink.css'

export function ActionLink(props) {
  const { to, className, children, cy, ...attributes } = props

  return (
    <Link to={to} className={classNames('ActionLink', className)} data-cy={cy} {...attributes}>
      {children}

      <FaChevronRight className="ActionLink-icon" />
    </Link>
  )
}
