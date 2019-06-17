import React from 'react'
import classNames from 'classnames'

import './ButtonWrapper.css'

class ButtonWrapper extends React.Component {
  render() {
    const {
      className,
      children
    } = this.props

    return (
      <div className={ classNames( 'ButtonWrapper', className ) }>
        { children }
      </div>
    )
  }
}

export default ButtonWrapper