import React from 'react'
import classNames from 'classnames'
import './PageContent.css'

export default function PageContent(props) {
  const { maxWidth, className, children } = props

  return (
    <section className={classNames(`PageContent PageContent--${maxWidth}`, className)}>
      {children}
    </section>
  )
}
