import React from 'react'
import './ScreenReaderOnly.css'

export default function ScreenReaderOnly(props) {
  const { children } = props

  return <span className="ScreenReaderOnly">{children}</span>
}
