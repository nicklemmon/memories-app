import React from 'react'

export function CardHeader(props) {
  const { children, metaContent } = props

  return (
    <div className="Card-header">
      {children}

      <span className="Card-meta">{metaContent}</span>
    </div>
  )
}
