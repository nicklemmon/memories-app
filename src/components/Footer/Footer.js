import React from 'react'
import classNames from 'classnames'
import './Footer.css'

export default function Footer(props) {
  const { className } = props
  const currentYear = new Date().getFullYear()

  return (
    <footer className={classNames('Footer', className)} data-cy="footer">
      <p>
        All rights reserved, <a href="http://nicklemmon.com">Nick Lemmon</a> {currentYear}
      </p>
    </footer>
  )
}
