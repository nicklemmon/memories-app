import React from 'react'

import './Heading.css'

class Heading extends React.Component {
  render() {
    const level = this.props.level
    const content = this.props.content
    const alignment = this.props.alignment
    const classNames = `Heading Heading--${level} ${this.props.classNames}`

    return (
      <div 
        className={ classNames }
        role='heading'
        aria-level={ level }
        style={{ textAlign: alignment }}
      >
        { content }
      </div>
    )
  }
}

export default Heading