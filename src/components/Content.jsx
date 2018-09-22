import React from 'react'
import classNames from 'classnames'

import './Content.css'

class Content extends React.Component {
  render() {
    const {
      maxWidth,
      className
    } = this.props

    return (
      <section className={ classNames( `Content Content--${maxWidth}`, className ) }>
        { this.props.children }
      </section>
    )
  }
}

export default Content