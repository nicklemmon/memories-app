import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'

import './ActionLink.css'

function ActionLink( props ) {
  const {
    to,
    className,
    children,
    cy,
    ...attributes
  } = props

  return (
    <NavLink
      to={ to }
      className={ classNames( 'ActionLink', className ) }
      data-cy={ cy }
      { ...attributes }
    >
      { children }

      <FaChevronRight className='ActionLink-icon' />
    </NavLink>
  )
}

export default ActionLink
