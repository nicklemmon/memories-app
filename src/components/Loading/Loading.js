import React from 'react'
import './Loading.css'

export function Loading(props) {
  const { description } = props

  return (
    <div className="Loading">
      <span className="Loading-spinnerWrapper">
        <span className="Loading-spinner" aria-label="Loading"></span>
      </span>

      {description && <span className="Loading-description">{description}</span>}
    </div>
  )
}
