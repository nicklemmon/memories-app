import React from 'react'
import classNames from 'classnames'

import './Heading.css'

class Heading extends React.Component {
  render() {
    const {
      level,
      content,
      alignment,
      className,
      ...props
    } = this.props

    return (
      <div 
        className={ classNames( `Heading Heading--${level}`, className ) }
        role='heading'
        aria-level={ level }
        style={{ textAlign: alignment }}
        { ...props }
      >
        { content }
      </div>
    )
  }
}

export default Heading