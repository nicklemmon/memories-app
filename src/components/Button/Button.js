import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import './Button.css'

export default function Button(props) {
  const { type, className, linkTo, fullWidth, onClick, cy, children } = props
  const calculatedClassNames = classNames(`Button Button--${type}`, className)
  const styles = { width: fullWidth ? '100%' : '' }

  return (
    <>
      {linkTo ? (
        <NavLink className={calculatedClassNames} style={styles} to={linkTo} data-cy={cy}>
          {children}
        </NavLink>
      ) : (
        <button className={calculatedClassNames} style={styles} onClick={onClick} data-cy={cy}>
          {children}
        </button>
      )}
    </>
  )
}
