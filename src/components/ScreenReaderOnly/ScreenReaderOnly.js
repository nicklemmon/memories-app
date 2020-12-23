import React from 'react'
import './ScreenReaderOnly.css'

export function ScreenReaderOnly({ children, as = 'span' }) {
  const Component = as

  return <Component className="ScreenReaderOnly">{children}</Component>
}
