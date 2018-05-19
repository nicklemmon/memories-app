import React from 'react'

import './Content.css'

class Content extends React.Component {
  render() {
    const maxWidth = `Content--${this.props.maxWidth}`
    const classNames = `Content ${maxWidth} ${this.props.classNames}`

    return (
      <section className={ classNames }>
        { this.props.children }
      </section>
    )
  }
}

export default Content