import React from 'react'

import './ButtonWrapper.css'

class ButtonWrapper extends React.Component {
  render() {
    const classNames = `ButtonWrapper ${this.props.classNames}`
    return (
      <div className={ classNames }>
        { this.props.children }
      </div>
    )
  }
}

export default ButtonWrapper