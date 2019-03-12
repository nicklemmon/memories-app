import React from 'react'

import './MaxWidth.css'

class MaxWidth extends React.Component {
  render() {
    const {
      size,
      children
    } = this.props

    return (
      <div className={ `MaxWidth MaxWidth--${ size }` }>
        { children }
      </div>
    )
  }
}

export default MaxWidth