import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component  {
  render() {
    const classNames = `Footer ${this.props.classNames}`
    const currentYear = ( new Date() ).getFullYear()

    return (
      <footer className={ classNames }>
        <p>All rights reserved, <a href="http://nicklemmon.com">Nick Lemmon</a> { currentYear }</p>
      </footer>
    )
  }
}

export default Footer
