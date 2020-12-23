import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import './Button.css'

export function Button(props) {
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
        <Link
          aria-disabled={disabled}
          className={calculatedClassNames}
          style={styles}
          to={linkTo}
          data-cy={cy}
        >
          {children}
        </Link>
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
