import React from 'react'

import './Tag.css'

class Tag extends React.Component {
  render() {
    const content = this.props.content

    return (
      <span className='Tag' role='button'>{ content }</span>
    )
  }
}

export default Tag