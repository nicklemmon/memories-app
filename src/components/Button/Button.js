import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import './Button.css'

export default function Button(props) {
  const { variant, className, linkTo, fullWidth, onClick, cy, children, type } = props
  const calculatedClassNames = classNames(`Button Button--${variant}`, className)
  const styles = { width: fullWidth ? '100%' : '' }

  return (
    <>
      {linkTo ? (
        <NavLink
          className={calculatedClassNames}
          style={styles}
          to={linkTo}
          data-cy={cy}
          type={type}
        >
          {children}
        </NavLink>
      ) : (
        <button
          className={calculatedClassNames}
          style={styles}
          onClick={onClick}
          data-cy={cy}
          type={type}
        >
          {children}
        </button>
      )}
    </>
  )
}
