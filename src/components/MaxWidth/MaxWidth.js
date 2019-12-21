import React from 'react'
import './MaxWidth.css'

export default function MaxWidth(props) {
  const { size, children } = props

  return <div className={`MaxWidth MaxWidth--${size}`}>{children}</div>
}
