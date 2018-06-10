import React from 'react'
import { NavLink } from 'react-router-dom';

import './Button.css'

class Button extends React.Component {
  render() {
    const type = this.props.type
    const classNames = `Button Button--${type} ${this.props.classNames}`;
    const linkTo = this.props.linkTo
    const content = this.props.content
    const fullWidth = this.props.fullWidth
    const styles = { width: fullWidth ? '100%' : '' }
    const role = this.props.role
    const tabIndex = this.props.tabIndex

    return (
      <React.Fragment>
        { linkTo ?
          <NavLink
            className={ classNames } 
            style={ styles }
            to={ linkTo }
            role={ role }
            tabIndex={ tabIndex }
          >
            { content }
          </NavLink>
        :
          <button
            className={ classNames } 
            style={ styles }
            onClick={ this.props.onClick }
            role={ role }
            tabIndex={ tabIndex }
          >
            { content }
          </button>
        }
      </React.Fragment>
    )
  }
}

export default Button