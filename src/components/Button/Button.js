import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom';

import './Button.css'

class Button extends React.Component {
  render() {
    const {
      type,
      className,
      linkTo,
      content,
      fullWidth,
      onClick,
      cy,
      ...attributes
    } = this.props

    const calculatedClassNames = classNames( `Button Button--${type}`, className )
    const styles = { width: fullWidth ? '100%' : '' }

    return (
      <React.Fragment>
        { linkTo ?
          <NavLink
            className={ calculatedClassNames } 
            style={ styles }
            to={ linkTo }
            data-cy={ cy }
            { ...attributes }
          >
            { content }
          </NavLink>
        :
          <button
            className={ calculatedClassNames } 
            style={ styles }
            onClick={ onClick }
            data-cy={ cy }
            { ...attributes }
          >
            { content }
          </button>
        }
      </React.Fragment>
    )
  }
}

export default Button
