import React from 'react'
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
      role,
      cy,
      ...attributes
    } = this.props

    const classNames = `Button Button--${type} ${this.props.classNames}`;
    const styles = { width: fullWidth ? '100%' : '' }

    return (
      <React.Fragment>
        { linkTo ?
          <NavLink
            className={ classNames } 
            style={ styles }
            to={ linkTo }
            data-cy={ cy }
            { ...attributes }
          >
            { content }
          </NavLink>
        :
          <button
            className={ classNames } 
            style={ styles }
            onClick={ this.props.onClick }
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
