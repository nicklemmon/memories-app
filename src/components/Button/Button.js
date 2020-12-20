import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import './Button.css'

export default function Button(props) {
  const {
    variant,
    className,
    disabled,
    linkTo,
    fullWidth,
    onClick,
    cy,
    children,
    type = 'button',
  } = props
  const calculatedClassNames = classNames(`Button Button--${variant}`, className)
  const styles = { width: fullWidth ? '100%' : '' }

  return (
    <>
      {linkTo ? (
        <NavLink
          aria-disabled={disabled}
          className={calculatedClassNames}
          style={styles}
          to={linkTo}
          data-cy={cy}
        >
          {children}
        </NavLink>
      ) : (
        <button
          disabled={disabled}
          className={calculatedClassNames}
          style={styles}
          onClick={onClick}
          type={type}
          data-cy={cy}
        >
          {children}
        </button>
      )}
    </>
  )
}
